import type { PageServerLoad } from "./$types";
import type { WishlistXProduct } from "$lib/types";

import { redirect } from "@sveltejs/kit";
import { logger } from "$lib/logs";

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
		logger.error(
			user.id,
			`[wishlist] select failed: ${result.error.message}`,
		);
	}

	const wishlist: WishlistXProduct[] = result.data ?? [];

	return {
		wishlist: wishlist,
	};
};
