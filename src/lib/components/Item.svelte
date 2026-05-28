<script lang="ts">
	import type { SupabaseClient } from "@supabase/supabase-js";
	import type { ActionProps } from "$lib/client/actions";
	import type { Product } from "$lib/types";

	import Carousel from "$lib/components/Carousel.svelte";

	import {
		addToCart,
		removeFromCart,
		removeFromWishlist,
	} from "$lib/client/actions";

	let {
		supabase = null,
		userId = null,
		item,
		count = 0,
		type,
	}: {
		supabase?: SupabaseClient | null;
		userId?: string | null;
		item: Product;
		count?: number;
		type: "home" | "cart" | "wishlist" | "order";
	} = $props();

	let actionsInfo = $derived(
		supabase && userId
			? ({
					supabase,
					userId,
					itemId: item.id,
					itemName: item.name,
				} satisfies ActionProps)
			: null,
	);
</script>

<!------------------------------------------>

<div
	class="h-fit p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4
		bg-d1 rounded-xl relative"
>
	<div class="side-by-side p-3 bg-d2 rounded-lg">
		<h1>
			{item.name}
			{#if count != 0}
				(x{count})
			{/if}
		</h1>
		<p class="inverted-price-tag z-1">
			€{item.cost}
		</p>
	</div>

	<Carousel imgs={item.images ?? []} alt="Images of {item.name}" />

	{#if type === "cart" || type === "wishlist"}
		<div
			class="w-full h-fit p-3 gap-3
				flex flex-row justify-end items-center
				bg-d2 rounded-lg z-1"
		>
			{#if type === "cart"}
				<button
					type="button"
					onclick={() => actionsInfo && removeFromCart(actionsInfo)}
					class="std-btn">Remove</button
				>
				{#if count > 1}
					<button
						type="button"
						onclick={() =>
							actionsInfo &&
							removeFromCart({ ...actionsInfo, count })}
						class="std-btn">Remove All</button
					>
				{/if}
			{:else if type === "wishlist"}
				<button
					type="button"
					onclick={() => actionsInfo && addToCart(actionsInfo)}
					class="std-btn">Add To Cart</button
				>
				<button
					type="button"
					onclick={() =>
						actionsInfo && removeFromWishlist(actionsInfo)}
					class="std-btn">Remove</button
				>
			{/if}
		</div>
	{/if}

	<a
		href="/product{item.id}"
		class="absolute top-0 left-0 w-full h-full
			rounded-xl border-2 border-d1
			transition-std hover:border-dark"
		aria-label={item.name}
	></a>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
