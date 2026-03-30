import { redirect } from "@sveltejs/kit";

export async function load({ locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { data: history } = await supabase
		.from("history")
		.select("payment_intent_id, created_at, total")
		.eq("user_id", user.id);

	return {
		history: history ?? [],
	};
}
