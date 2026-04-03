import type { LayoutServerLoad } from "./$types";
import type { Product } from "$lib/types";

import { logger } from "$lib/logs";

export const load: LayoutServerLoad = async ({
	locals: { supabase, safeGetSession },
	cookies,
	depends,
}) => {
	depends("supabase:auth");

	const { session, user } = await safeGetSession();

	const result = await supabase.from("products").select("*");
	if (result.error) {
		logger.error(null, `[products] select failed: ${result.error.message}`);
	}
	const products: Product[] = result.data ?? [];
	return {
		session,
		user,
		cookies: cookies.getAll(),
		products: products satisfies Product[],
	};
};
