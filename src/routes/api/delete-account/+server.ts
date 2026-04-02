import { redirect, json } from "@sveltejs/kit";
import { supabaseAdmin } from "$lib/server/supabaseAdmin";

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
	console.log(user.id, "Image Deleted");

	const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
		user!.id,
	);
	if (deleteError) {
		return json({ success: false, error: deleteError.message });
	}
	console.log(user.id, "Account Deleted");

	return json({ success: true, error: "" });
}
