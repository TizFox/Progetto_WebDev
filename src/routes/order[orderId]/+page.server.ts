import type { PageServerLoad } from "./$types";
import type { HistoryxOrderxProduct } from "$lib/types";

import { redirect } from "@sveltejs/kit";
import { verifyPayment, getCartTotal, cartToOrder } from "$lib/server/actions";
import { logger } from "$lib/logs";

export const load: PageServerLoad = async ({
	params,
	url,
	locals: { supabase, safeGetSession },
}) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	let paramHistoryId: string = params.orderId;

	// Trying: orderNEW?payent_intent=[paymentID],...
	if (paramHistoryId === "NEW") {
		let paymentId = url.searchParams.get("payment_intent");
		if (!paymentId) {
			logger.error(user.id, "PaymentId not Found");
			throw redirect(303, "/");
		}

		// Check if already exists an order with the paymeny_id
		const result = await supabase
			.from("history")
			.select("*, orders(*, products(*))")
			.eq("payment_id", paymentId)
			.eq("user_id", user.id);
		if (result.error) {
			logger.error(user.id, result.error.message);
			throw redirect(303, "/");
		}
		const existingHistory: HistoryxOrderxProduct | null = result.data
			? result.data[0]
			: null;

		if (existingHistory) {
			return {
				historyId: existingHistory.id,
				orderItems: existingHistory.orders,
				historyCreatedAt: existingHistory.created_at,
				historyTotal: existingHistory.total,
			};
		}

		// New Order
		const ok = await verifyPayment(paymentId);
		if (!ok) {
			logger.warn(user.id, `Payment(${paymentId}) not Succeeded`);
			throw redirect(303, "/");
		}

		// Trasfer cart to history + orders
		const { cart, total } = await getCartTotal({
			supabase,
			userId: user.id,
		});

		let { historyId, createdAt } = await cartToOrder({
			supabase,
			userId: user.id,
			paymentId: paymentId,
			cart: cart,
			total: total,
		});
		if (!historyId || !createdAt) {
			logger.error(user.id, "Failed to create new History");
			throw redirect(303, "/");
		}
		logger.success(user.id, `Created new History (${historyId})`);

		return {
			historyId,
			orderItems: cart,
			historyCreatedAt: createdAt,
			historyTotal: total,
		};
	}

	// Trying order[orderId]
	const result = await supabase
		.from("history")
		.select("*, orders(*, products(*))")
		.eq("id", paramHistoryId)
		.eq("user_id", user.id)
		.single();
	if (result.error) {
		logger.error(user.id, result.error.message);
	}
	const history: HistoryxOrderxProduct | null = result.data;
	if (!history) {
		logger.error(
			user.id,
			`History not found by HistoryId (${paramHistoryId})`,
		);
		throw redirect(303, "/");
	}

	return {
		historyId: history.id,
		orderItems: history.orders,
		historyCreatedAt: history.created_at,
		historyTotal: history.total,
	};
};
