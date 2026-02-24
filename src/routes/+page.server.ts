import { supabaseClient } from "$lib/supabase";

export async function load() {
	const { data } = await supabaseClient.from("products").select("*");
	return {
		products: data ?? [],
	};
}
