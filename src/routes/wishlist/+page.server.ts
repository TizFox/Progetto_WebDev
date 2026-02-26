import { supabaseClient } from "$lib/supabase";

export async function load() {
	const { data } = await supabaseClient
		.from("wishlist")
		.select("*, products(*)");
	return {
		wishlist: data ?? [],
	};
}
