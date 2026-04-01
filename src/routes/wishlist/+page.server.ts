import type { PageServerLoad } from "./$types.js";
import type { WishlistXProduct } from "$lib/types.js";

import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({
	locals: { supabase, safeGetSession },
}) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const result = await supabase
		.from("wishlist")
		.select("*, products(*)")
		.eq("user_id", user.id);
	if (result.error) {
		console.error("Error Wishlist:", result.error.message);
	}

	const wishlist: WishlistXProduct[] = result.data ?? [];

	return {
		wishlist: wishlist,
	};
};
