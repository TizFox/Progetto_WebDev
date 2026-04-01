import type { LayoutServerLoad } from "./$types";
import type { Product } from "$lib/types";

export const load: LayoutServerLoad = async ({
	locals: { supabase, safeGetSession },
	cookies,
	depends,
}) => {
	depends("supabase:auth");

	const { session, user } = await safeGetSession();

	const result = await supabase.from("products").select("*");
	if (result.error) {
		console.error("Error Products:", result.error.message);
	}
	const products: Product[] = result.data ?? [];
	return {
		session,
		user,
		cookies: cookies.getAll(),
		products,
	};
};
