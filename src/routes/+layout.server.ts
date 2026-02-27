import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({
	locals: { supabase, safeGetSession },
	cookies,
	depends,
}) => {
	depends("supabase:auth");

	const { session, user } = await safeGetSession();

	const { data: products } = await supabase.from("products").select("*");
	return {
		session,
		user,
		cookies: cookies.getAll(),
		products,
	};
};
