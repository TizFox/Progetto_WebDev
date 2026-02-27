import {
	createBrowserClient,
	createServerClient,
	isBrowser,
} from "@supabase/ssr";
import type { LayoutLoad } from "./$types";
import {
	PUBLIC_SUPABASE_URL,
	PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
} from "$env/static/public";

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	depends("supabase:auth");

	const supabase = isBrowser()
		? createBrowserClient(
				PUBLIC_SUPABASE_URL,
				PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
				{
					global: { fetch },
				},
			)
		: createServerClient(
				PUBLIC_SUPABASE_URL,
				PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
				{
					global: { fetch },
					cookies: {
						getAll() {
							return data.cookies;
						},
					},
				},
			);

	return {
		supabase,
		session: data.session,
		user: data.user,
		products: data.products,
	};
};
