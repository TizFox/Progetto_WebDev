import type { CartXProduct, WishlistXProduct } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
	params,
	locals: { supabase, safeGetSession },
}) => {
	let itemId: string = params.itemId;

	const { session, user } = await safeGetSession();
	if (!session || !user) {
		return { itemId, cart: [], wishlist: [] };
	}

	const { data: item, error } = await supabase
		.from("products")
		.select("*")
		.eq("id", itemId)
		.single();
	if (error) {
		console.error("Error Item:", error.message);
	}

	const resultCart = await supabase
		.from("cart")
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", user.id);
	if (resultCart.error) {
		console.error("Error Cart:", resultCart.error.message);
	}
	const cart: CartXProduct[] = resultCart.data ?? [];
	let inCartCount = cart && cart.length === 1 ? cart[0].count : 0;

	const resultWishlist = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", user.id);
	if (resultWishlist.error) {
		console.error("Error Wishlist:", resultWishlist.error.message);
	}
	const wishlist: WishlistXProduct[] = resultWishlist.data ?? [];
	let inWishlist = wishlist && wishlist.length === 1;

	return { item, inCartCount, inWishlist };
};
