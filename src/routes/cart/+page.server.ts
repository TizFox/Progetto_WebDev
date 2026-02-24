import { supabase } from "$lib/supabaseClient";

export async function load() {
	const { data } = await supabase.from("cart").select("*"); // Dove user == loggedUser
	return {
		products: data ?? [],
	};
}
