import { supabase } from "$lib/supabaseClient";

export async function load() {
	const { data } = await supabase.from("wishlist").select("*"); // Dove user == loggedUser
	return {
		products: data ?? [],
	};
}
