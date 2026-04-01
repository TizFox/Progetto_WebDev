import type { PageServerLoad } from "./$types";
import type { HistoryxOrderxProduct } from "$lib/types";

import { redirect } from "@sveltejs/kit";
import { verifyPayment, getCartTotal, cartToOrder } from "$lib/server/actions";

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
			throw redirect(303, "/");
		}

		// Check if already exists an order with the paymeny_id
		const result = await supabase
			.from("history")
			.select("*, orders(*, products(*))")
			.eq("payment_id", paymentId)
			.eq("user_id", user.id)
			.single();
		if (result.error) {
			console.error("Error History:", result.error.message);
		}
		const existingHistory: HistoryxOrderxProduct | null = result.data;

		if (existingHistory) {
			console.log("Order Found by PaymentId");
			return {
				historyId: existingHistory.id,
				orderItems: existingHistory.orders,
				historyCreatedAt: existingHistory.created_at,
				historyTotal: existingHistory.total,
			};
		}

		// New Order
		const succeeded = await verifyPayment(paymentId);
		if (!succeeded) {
			console.log("Payment Not Succeeded: " + paymentId);
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
			console.log("History not Found");
			throw redirect(303, "/");
		}
		console.log("Creating New History: " + historyId);

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
		console.error("Error History:", result.error.message);
	}
	const history: HistoryxOrderxProduct | null = result.data;
	if (!history) {
		console.log("OrderId not Found");
		throw redirect(303, "/");
	}

	console.log("Order Found by OrderId");
	return {
		historyId: history.id,
		orderItems: history.orders,
		historyCreatedAt: history.created_at,
		historyTotal: history.total,
	};
};
