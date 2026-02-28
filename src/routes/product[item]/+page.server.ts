import { redirect } from "@sveltejs/kit";

export async function load({ params, locals: { supabase, safeGetSession } }) {
	let itemId = params.item;

	const { session, user } = await safeGetSession();
	if (!session || !user) {
		return { itemId, cart: [], wishlist: [] };
	}

	const { data: cart } = await supabase
		.from("cart")
		.select("*")
		.eq("product_id", itemId);
	const { data: wishlist } = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", itemId);

	return { itemId, cart, wishlist };
}
