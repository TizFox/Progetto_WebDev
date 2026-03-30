import { redirect } from "@sveltejs/kit";
import { getCartTotal, cartToChronology } from "$lib/server/actions";

export async function load({ url, locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	let { cart } = await getCartTotal({ supabase, userId: user.id });
	const paymentIntentId = url.searchParams.get("payment_intent");
	if (!cart || !paymentIntentId) {
		throw redirect(303, "/");
	}

	await cartToChronology({
		supabase,
		userId: user.id,
		paymentIntentId,
		cart,
	});

	return {
		order: cart,
		paymentIntentId,
	};
}
