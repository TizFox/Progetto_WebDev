import { redirect } from "@sveltejs/kit";

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { data: cart } = await supabase.from("cart").select("*, products(*)");
	//.eq("user_id", user.id);
	return {
		cart: cart ?? [],
	};
}
