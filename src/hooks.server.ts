import { createServerClient } from "@supabase/ssr";
import type { Handle } from "@sveltejs/kit";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from "$env/static/public";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(
		PUBLIC_SUPABASE_URL,
		PUBLIC_SUPABASE_KEY,
		{
			cookies: {
				getAll: () => {
					return event.cookies.getAll();
				},
				setAll: (cookiesToSet) => {
					cookiesToSet.forEach(({ name, value, options }) => {
						event.cookies.set(name, value, {
							...options,
							path: "/",
						});
					});
				},
			},
		},
	);

	event.locals.safeGetSession = async () => {
		// Prima va controllato l'utente in modo da poter autenticarlo
		// poi successivamente si controlla la sessione tramite i cookies, che non assicurano l'autenticazione

		// Controlla l'utente
		const {
			data: { user },
			error,
		} = await event.locals.supabase.auth.getUser();
		if (error || !user) {
			return {
				session: null,
				user: null,
			};
		}

		// Controlla se c'è già una sessione usando i cookie
		const {
			data: { session },
		} = await event.locals.supabase.auth.getSession();
		if (!session) {
			return {
				session: null,
				user: null,
			};
		}

		return {
			session,
			user,
		};
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return (
				name === "content-range" || name === "x-supabase-api-version"
			);
		},
	});
};
