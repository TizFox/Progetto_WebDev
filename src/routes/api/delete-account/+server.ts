import { redirect, json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";
import { logger } from "$lib/logs";

export async function POST({ locals: { safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
		user.id,
	);
	if (deleteError) {
		logger.error(
			user.id,
			`Auth[${user.id}] delete failed: ${deleteError.message}`,
		);
		return json({ success: false, error: deleteError.message });
	}

	const { error: storageError } = await supabaseAdmin.storage
		.from("user_images")
		.remove([`${user.id}/profileImage.webp`]);
	if (storageError) {
		logger.error(
			user.id,
			`Storage[user_images] delete failed: ${storageError.message}`,
		);
	}

	logger.success(user.id, "Account & Image Deleted");

	return json({ success: true, error: "" });
}
