import { supabaseClient } from "$lib/supabase";

export async function load() {
	const { data } = await supabaseClient.from("cart").select("*, products(*)");
	return {
		cart: data ?? [],
	};
}
