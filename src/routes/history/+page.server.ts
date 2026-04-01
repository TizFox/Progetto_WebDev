import type { PageServerLoad } from "./$types";
import type { History } from "$lib/types";

import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({
	locals: { supabase, safeGetSession },
}) => {
	const { session, user } = await safeGetSession();

	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const result = await supabase
		.from("history")
		.select("*")
		.eq("user_id", user.id);
	if (result.error) {
		console.error("Error History:", result.error.message);
	}
	const history: History[] = result.data ?? [];

	return {
		history,
	};
};
