import type { SupabaseClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "$env/static/private";

export const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function verifyPayment(paymentIntentId: string): Promise<boolean> {
	const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
	return paymentIntent.status === "succeeded";
}

interface CartProps {
	supabase: SupabaseClient;
	userId: string | undefined;
	paymentIntentId?: string;
	cart?: any[];
	total?: number;
}
export const getCartTotal = async ({ supabase, userId }: CartProps) => {
	if (!userId) {
		return { cart: [], total: NaN };
	}

	const { data: cart } = await supabase
		.from("cart")
		.select("*, products(*)")
		.eq("user_id", userId);

	let total = 0;
	for (const item of cart ?? []) {
		total += item.products.cost * item.count;
	}

	return {
		cart: cart ?? [],
		total: Math.round(total * 100) / 100,
	};
};

export const cartToHistory = async ({
	supabase,
	userId,
	paymentIntentId,
	cart,
	total,
}: CartProps) => {
	if (!cart || !paymentIntentId) return;

	for (let item of cart) {
		let { error } = await supabase.from("history").insert([
			{
				product_id: item.product_id,
				user_id: item.user_id,
				count: item.count,
				payment_intent_id: paymentIntentId,
				total: total,
			},
		]);
		if (error) {
			console.error("Error tranfer to history:", error.message);
		}
	}

	let { error } = await supabase.from("cart").delete().eq("user_id", userId);
	if (error) {
		console.error("Error clearing cart:", error.message);
	}
};
