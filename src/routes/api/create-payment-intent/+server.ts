import { redirect, json } from "@sveltejs/kit";

import { stripeAdmin } from "$lib/server/stripeAdmin";
import { getCartTotal } from "$lib/server/actions";

export async function POST({ locals: { supabase, safeGetSession } }) {
	const { session, user } = await safeGetSession();
	if (!session || !user) {
		throw redirect(303, "/login");
	}

	const { total } = await getCartTotal({ supabase, userId: user.id });

	const paymentIntent = await stripeAdmin.paymentIntents.create({
		amount: Math.round(total * 100),
		currency: "eur",
		payment_method_types: ["card"],
		//automatic_payment_methods: {enabled: true},
	});

	return json({ clientSecret: paymentIntent.client_secret });
}
