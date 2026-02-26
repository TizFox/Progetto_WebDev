import { supabaseClient } from "$lib/supabase";

export async function load() {
	const { data } = await supabaseClient
		.from("chronology")
		.select("*, products(*)");
	return {
		chronology: data ?? [],
	};
}
