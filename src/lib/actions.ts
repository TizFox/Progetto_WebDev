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

	let { data: item } = await supabase
		.from(table)
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", userId);

	if (!item || !item[0]) {
		let { error } = await supabase.from(table).insert([
			{
				product_id: itemId,
				user_id: userId,
			},
		]);

		if (error) {
			alert(
				`Product (${itemName}) already in ${table.toUpperCase()}\n\n` +
					error.message,
			);
		} else {
			alert(`Product (${itemName}) inserted to ${table.toUpperCase()}`);
			await invalidateAll();
		}
	} else if (table === "cart") {
		let { error } = await supabase
			.from(table)
			.update({ count: item[0].count + 1 })
			.eq("product_id", itemId)
			.eq("user_id", userId);

		if (error) {
			alert(error.message);
		} else {
			alert(
				`Product (${itemName}) updated (+1) to ${table.toUpperCase()}`,
			);
			await invalidateAll();
		}
	}
};
const removeFrom = async (
	table: string,
	{ supabase, userId, itemId, itemName }: actionProps,
) => {
	if (!userId) return;

	let { data: item } = await supabase
		.from(table)
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", userId);

	if (item && item[0])
		if (table == "cart" && item[0].count > 1) {
			let { error } = await supabase
				.from(table)
				.update({ count: item[0].count - 1 })
				.eq("product_id", itemId)
				.eq("user_id", userId);

			if (error) {
				alert(error.message);
			} else {
				alert(
					`Product (${itemName}) updated (-1) from your ${table.toUpperCase()}`,
				);
				await invalidateAll();
			}
		} else {
			let { error } = await supabase
				.from(table)
				.delete()
				.eq("product_id", itemId)
				.eq("user_id", userId);

			if (error) {
				alert(error.message);
			} else {
				alert(
					`Product (${itemName}) removed from your ${table.toUpperCase()}`,
				);
				await invalidateAll();
			}
		}
};
