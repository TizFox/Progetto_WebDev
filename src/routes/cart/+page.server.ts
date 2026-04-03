import type { PageServerLoad } from "./$types";

import { redirect } from "@sveltejs/kit";
import { getCartTotal } from "$lib/server/actions";

export const load: PageServerLoad = async ({
	locals: { supabase, safeGetSession },
}) => {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { cart, total } = await getCartTotal({ supabase, userId: user.id });

	return {
		cart,
		total,
	};
};
