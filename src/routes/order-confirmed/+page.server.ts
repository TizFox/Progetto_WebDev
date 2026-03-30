import { redirect } from "@sveltejs/kit";
import {
	stripe,
	verifyPayment,
	getCartTotal,
	cartToHistory,
} from "$lib/server/actions";

export async function load({ url, locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const paymentIntentId = url.searchParams.get("payment_intent");
	if (!paymentIntentId) {
		throw redirect(303, "/");
	}

	const { data: existing } = await supabase
		.from("history")
		.select("*, products(*)")
		.eq("payment_intent_id", paymentIntentId)
		.eq("user_id", user.id);

	if (existing && existing.length > 0) {
		console.log("Order Found");
		return { order: existing, paymentIntentId };
	}

	const succeeded = await verifyPayment(paymentIntentId);
	if (!succeeded) {
		console.log("Not Succeeded");
		throw redirect(303, "/");
	}

	const { cart, total } = await getCartTotal({ supabase, userId: user.id });
	console.log("New Order");
	await cartToHistory({
		supabase,
		userId: user.id,
		paymentIntentId,
		cart: cart ?? [],
		total: total ?? 0,
	});

	return {
		order: cart ?? [],
		paymentIntentId,
	};
}
