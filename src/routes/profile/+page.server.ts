import { redirect } from "@sveltejs/kit";

export async function load({ locals: { safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	return {};
}
