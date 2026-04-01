// Utils
export function getHEX(variable: string): string {
	if (typeof window === "undefined") {
		return "";
	}
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim();
}

function twoDigit(n: number): string {
	return (Math.floor(n / 10) == 0 ? "0" : "") + n;
}
export function formatDate(s: string): string {
	let date = new Date(s);
	return `${twoDigit(date.getDate())} / ${twoDigit(date.getMonth() + 1)} / ${date.getFullYear()} - ${twoDigit(date.getHours())}:${twoDigit(date.getMinutes())}`;
}

// -------------------------------------

import { invalidateAll } from "$app/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

export type ActionProps = {
	supabase: SupabaseClient;
	userId: string;
	itemId: string;
	itemName: string;
};
export const addToCart = async (ap: ActionProps): Promise<void> => {
	await addTo("cart", ap);
};
export const removeFromCart = async (ap: ActionProps): Promise<void> => {
	await removeFrom("cart", ap);
};

export const addToWishlist = async (ap: ActionProps): Promise<void> => {
	await addTo("wishlist", ap);
};
export const removeFromWishlist = async (ap: ActionProps): Promise<void> => {
	await removeFrom("wishlist", ap);
};

type MutableTable = "cart" | "wishlist";
const addTo = async (
	table: MutableTable,
	{ supabase, userId, itemId, itemName }: ActionProps,
): Promise<void> => {
	if (!supabase || !userId) {
		return;
	}

	let { data: item, error } = await supabase
		.from(table)
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", userId);
	if (error) {
		console.error(`Error ${table}:`, error.message);
	}

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
	{ supabase, userId, itemId, itemName }: ActionProps,
): Promise<void> => {
	if (!supabase || !userId) {
		return;
	}

	let { data: item, error } = await supabase
		.from(table)
		.select("*")
		.eq("product_id", itemId)
		.eq("user_id", userId);
	if (error) {
		console.error(`Error ${table}:`, error.message);
	}

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
