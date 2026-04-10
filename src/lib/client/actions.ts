import type { SupabaseClient } from "@supabase/supabase-js";
import { invalidateAll } from "$app/navigation";

import { notifyPush } from "./notifications";

import { logger } from "$lib/logs";

export type ActionProps = {
	supabase: SupabaseClient;
	userId: string;
	itemId: string;
	itemName: string;
	count?: number;
};

let timeoutHandle = setTimeout(() => {});

export const addToCart = async ({
	supabase,
	userId,
	itemId,
	itemName,
}: ActionProps): Promise<void> => {
	// Notifica per ricordare degli item nel cart
	clearTimeout(timeoutHandle);
	timeoutHandle = setTimeout(
		notifyPush,
		5000,
		"Cart",
		"Non dimenticarti dei tuo carrello.",
		"/cart",
	);

	await addTo("cart", { supabase, userId, itemId, itemName });
};
export const removeFromCart = async (ap: ActionProps): Promise<void> => {
	await removeFrom("cart", ap);
};

export const addToWishlist = async ({
	supabase,
	userId,
	itemId,
	itemName,
}: ActionProps): Promise<void> => {
	await addTo("wishlist", { supabase, userId, itemId, itemName });
};
export const removeFromWishlist = async ({
	supabase,
	userId,
	itemId,
	itemName,
}: ActionProps): Promise<void> => {
	await removeFrom("wishlist", {
		supabase,
		userId,
		itemId,
		itemName,
	});
};

type MutableTable = "cart" | "wishlist";
const addTo = async (
	table: MutableTable,
	{ supabase, userId, itemId, itemName, count = 1 }: ActionProps,
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
		logger.error(userId, `[${table}]: ${error.message}`);
	}

	if (!item || !item[0]) {
		let { error } = await supabase.from(table).insert([
			{
				product_id: itemId,
				user_id: userId,
			},
		]);

		if (error) {
			logger.error(
				userId,
				`[${table}] insert failed for Product(${itemId}): ${error.message}`,
			);
			alert(
				`Product (${itemName}) cant be inserted in ${table.toUpperCase()}`,
			);
		} else {
			alert(`Product (${itemName}) inserted to ${table.toUpperCase()}`);
			await invalidateAll();
		}
	} else if (table === "cart") {
		let { error } = await supabase
			.from(table)
			.update({ count: item[0].count + count })
			.eq("product_id", itemId)
			.eq("user_id", userId);

		if (error) {
			logger.error(
				userId,
				`[${table}] update failed for Product(${itemId}): ${error.message}`,
			);
			alert(
				`Product (${itemName}) cant be updated (+${count}) from ${table.toUpperCase()}`,
			);
		} else {
			alert(
				`Product (${itemName}) updated (+${count}) from ${table.toUpperCase()}`,
			);
			await invalidateAll();
		}
	}
};
const removeFrom = async (
	table: string,
	{ supabase, userId, itemId, itemName, count = 1 }: ActionProps,
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
		logger.error(userId, `[${table}]: ${error.message}`);
	}

	if (item && item[0])
		if (table == "cart" && item[0].count > count) {
			let { error } = await supabase
				.from(table)
				.update({ count: item[0].count - count })
				.eq("product_id", itemId)
				.eq("user_id", userId);

			if (error) {
				logger.error(
					userId,
					`[${table}] update failed for Product(${itemId}): ${error.message}`,
				);
				alert(
					`Product (${itemName}) cant be updated (-${count}) from ${table.toUpperCase()}`,
				);
			} else {
				alert(
					`Product (${itemName}) updated (-${count}) from ${table.toUpperCase()}`,
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
				logger.error(
					userId,
					`[${table}] remove failed for Product(${itemId}): ${error.message}`,
				);
				alert(
					`Product (${itemName}) cant be removed from ${table.toUpperCase()}`,
				);
			} else {
				alert(
					`Product (${itemName}) removed from ${table.toUpperCase()}`,
				);
				await invalidateAll();
			}
		}
};
