import type { SupabaseClient } from "@supabase/supabase-js";
import { invalidateAll } from "$app/navigation";

import { notifyPush } from "$lib/client/notifications";
import { toast } from "svelte-sonner";

import { logger } from "$lib/logs";
import Toast from "$lib/components/Toast.svelte";

export const showToast = (
	type: "success" | "error" | "info" | "warning",
	title: string,
	message: string,
): void => {
	toast.custom(Toast, {
		componentProps: {
			type,
			title,
			message,
		},
	});
};

export type ActionProps = {
	supabase: SupabaseClient;
	userId: string;
	itemId: string;
	itemName: string;
	count?: number;
};

export const addToCart = async ({
	supabase,
	userId,
	itemId,
	itemName,
}: ActionProps): Promise<void> => {
	notifyPush("Cart", "Non dimenticarti del tuo carrello", "/cart", 5000); // 5sec (sarebbe da fare tipo 5min)

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
			showToast(
				"error",
				table.toUpperCase(),
				`Can't insert Product (${itemName})`,
			);
		} else {
			showToast(
				"info",
				table.toUpperCase(),
				`Inserted  Product (${itemName})`,
			);
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
			showToast(
				"error",
				table.toUpperCase(),
				`Can't update (+${count}) Product (${itemName})`,
			);
		} else {
			showToast(
				"info",
				table.toUpperCase(),
				`Updated (+${count}) Product (${itemName})`,
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
				showToast(
					"error",
					table.toUpperCase(),
					`Can't update (-${count}) Product (${itemName})`,
				);
			} else {
				showToast(
					"info",
					table.toUpperCase(),
					`Updated (-${count}) Product (${itemName})`,
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
				showToast(
					"error",
					table.toUpperCase(),
					`Can't remove Product (${itemName})`,
				);
			} else {
				showToast(
					"info",
					table.toUpperCase(),
					`Removed Product (${itemName})`,
				);
				await invalidateAll();
			}
		}
};
