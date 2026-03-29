import { redirect } from "@sveltejs/kit";

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { data: cart } = await supabase.from("cart").select("*, products(*)");

	let total = 0;
	for (const item of cart ?? []) {
		total += item.products.cost * item.count;
	}

	return {
		cart: cart ?? [],
		total: total.toFixed(2),
	};
}
