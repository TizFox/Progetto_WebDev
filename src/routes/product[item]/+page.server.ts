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
	let cartItem = cart && cart.length === 1 ? cart[0] : null;

	const { data: wishlist } = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", itemId);
	let wishlistItem = wishlist && wishlist.length === 1 ? wishlist[0] : null;

	return { itemId, cartItem, wishlistItem };
}
