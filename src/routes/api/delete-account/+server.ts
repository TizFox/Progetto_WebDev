import { redirect, json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import { logger } from "$lib/logs";

export async function POST({ locals: { safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { error: storageError } = await supabaseAdmin.storage
		.from("user_images")
		.remove([`${user!.id}/profileImage.webp`]);
	if (storageError) {
		return json({ success: false, error: storageError.message });
	}
	logger.log(user.id, "Image Deleated");

	const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
		user!.id,
	);
	if (deleteError) {
		return json({ success: false, error: deleteError.message });
	}
	logger.log(user.id, "Account Deleated");

	return json({ success: true, error: "" });
}
