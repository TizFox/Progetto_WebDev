import { invalidateAll } from "$app/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

interface actionProps {
	supabase: SupabaseClient;
	userId: string | undefined;
	itemId: string;
	itemName: string;
}

export const addToCart = async (ap: actionProps) => {
	await addTo("cart", ap);
};
export const removeFromCart = async (ap: actionProps) => {
	await removeFrom("cart", ap);
};

export const addToWishlist = async (ap: actionProps) => {
	await addTo("wishlist", ap);
};
export const removeFromWishlist = async (ap: actionProps) => {
	await removeFrom("wishlist", ap);
};

export const addToChronology = async (ap: actionProps) => {
	await addTo("chronology", ap);
};

const addTo = async (
	table: string,
	{ supabase, userId, itemId, itemName }: actionProps,
) => {
	if (!userId) return;

	let { error } = await supabase.from(table).insert([
		{
			product_id: itemId,
			user_id: userId,
		},
	]);

	if (error) {
		alert(error.message);
	} else {
		alert(`Product (${itemName}) added to ${table.toUpperCase()}`);
		await invalidateAll();
	}
};
const removeFrom = async (
	table: string,
	{ supabase, userId, itemId, itemName }: actionProps,
) => {
	if (!userId) return;

	let { error } = await supabase
		.from(table)
		.delete()
		.eq("product_id", itemId)
		.eq("user_id", userId);

	if (error) {
		alert(error.message);
	} else {
		alert(`Product (${itemName}) removed from your ${table.toUpperCase()}`);
		await invalidateAll();
	}
};
