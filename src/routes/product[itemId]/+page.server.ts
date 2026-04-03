import type { Product, CartXProduct, WishlistXProduct } from "$lib/types";
import type { PageServerLoad } from "./$types";

import { logger } from "$lib/logs";

export const load: PageServerLoad = async ({
	params,
	locals: { supabase, safeGetSession },
}) => {
	let itemId: string = params.itemId;

	const resultItem = await supabase
		.from("products")
		.select("*")
		.eq("id", itemId)
		.single();
	if (resultItem.error) {
		logger.error(
			null,
			`[products] select failed: ${resultItem.error.message}`,
		);
		return { item: null, inCartCount: 0, inWishlist: false };
	}
	const item: Product = resultItem.data;

	// If user is logged calculate his data
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		return { item, inCartCount: 0, inWishlist: false };
	}

	const resultCart = await supabase
		.from("cart")
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", user.id);
	if (resultCart.error) {
		logger.error(
			user.id,
			`[cart] select failed: ${resultCart.error.message}`,
		);
		return { item, inCartCount: 0, inWishlist: false };
	}
	const cart: CartXProduct[] = resultCart.data ?? [];
	let inCartCount = cart && cart.length === 1 ? cart[0].count : 0;

	const resultWishlist = await supabase
		.from("wishlist")
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", user.id);
	if (resultWishlist.error) {
		logger.error(
			user.id,
			`[wishlist] select failed: ${resultWishlist.error.message}`,
		);
		return { item, inCartCount, inWishlist: false };
	}
	const wishlist: WishlistXProduct[] = resultWishlist.data ?? [];
	let inWishlist = wishlist && wishlist.length === 1;

	return { item, inCartCount, inWishlist };
};
