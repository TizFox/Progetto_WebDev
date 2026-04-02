import type { SupabaseClient } from "@supabase/supabase-js";
import type { CartXProduct } from "$lib/types";

import { stripeAdmin } from "$lib/server/stripeAdmin";

export async function verifyPayment(paymentIntentId: string): Promise<boolean> {
	const paymentIntent =
		await stripeAdmin.paymentIntents.retrieve(paymentIntentId);
	return paymentIntent.status === "succeeded";
}

interface GetCartProps {
	supabase: SupabaseClient;
	userId: string;
}
export const getCartTotal = async ({
	supabase,
	userId,
}: GetCartProps): Promise<{ cart: CartXProduct[]; total: number }> => {
	if (!userId) {
		return { cart: [], total: NaN };
	}

	const result = await supabase
		.from("cart")
		.select("*, products(*)")
		.eq("user_id", userId);
	if (result.error) {
		console.error("Error Cart:", result.error.message);
	}
	const cart: CartXProduct[] = result.data ?? [];

	let total = 0;
	for (const item of cart) {
		total += item.products.cost * item.count;
	}

	return {
		cart: cart,
		total: Math.round(total * 100) / 100,
	};
};

interface CartToOrderProps {
	supabase: SupabaseClient;
	userId: string;
	paymentId: string;
	cart: CartXProduct[];
	total: number;
}
export const cartToOrder = async ({
	supabase,
	userId,
	paymentId,
	cart,
	total,
}: CartToOrderProps): Promise<{
	historyId: string | null;
	createdAt: string | null;
}> => {
	if (!cart || cart.length === 0 || !paymentId) {
		return { historyId: null, createdAt: null };
	}

	// Create new History row
	let { data, error } = await supabase
		.from("history")
		.insert([
			{
				user_id: userId,
				payment_id: paymentId,
				total: total,
			},
		])
		.select("id, created_at")
		.single();
	if (!data || error) {
		console.error("Error inserting in History:", error?.message);
		return { historyId: null, createdAt: null };
	}

	const historyId = data.id;
	const createdAt = data.created_at;

	for (let item of cart) {
		let { error } = await supabase.from("orders").insert([
			{
				user_id: userId,
				history_id: historyId,
				product_id: item.product_id,
				count: item.count,
			},
		]);
		if (error) {
			console.error("Error inserting in Orders:", error?.message);
		}
	}

	let { error: deleteError } = await supabase
		.from("cart")
		.delete()
		.eq("user_id", userId);
	if (deleteError) {
		console.error("Error clearing cart:", deleteError.message);
	}

	return { historyId: historyId, createdAt: createdAt };
};
