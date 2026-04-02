<script lang="ts">
	import type { PageData } from "./$types.js";

	import Carousel from "$lib/components/Carousel.svelte";

	import {
		addToCart,
		addToWishlist,
		removeFromWishlist,
	} from "$lib/client/actions";

	let { data } = $props();
	let { supabase, user, item, inCartCount, inWishlist }: PageData =
		$derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>{item.name} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col md:page-row">
	<div
		class="w-full h-full rounded-xl
		bg-d1 shadow-2xl"
	>
		<Carousel imgs={item.images} alt="Images of {item.name}" />
	</div>

	<div class="w-full md:max-w-[33dvw] page page-col">
		<div class="side-by-side">
			<h1>{item.name}</h1>
			<p class="inverted-price-tag">
				€{item.cost}
			</p>
		</div>
		<p class="w-full text-left">{item.description}</p>

		{#if user}
			<div class="side-by-side">
				<button
					type="button"
					onclick={() =>
						addToCart({
							supabase,
							userId: user.id,
							itemId: item.id,
							itemName: item.name,
						})}
					class="std-btn">Add To Cart</button
				>
				{#if inCartCount}
					<p>Already in Cart (x{inCartCount})</p>
				{/if}
			</div>

			<button
				type="button"
				onclick={() => {
					if (inWishlist)
						removeFromWishlist({
							supabase,
							userId: user.id,
							itemId: item.id,
							itemName: item.name,
						});
					else
						addToWishlist({
							supabase,
							userId: user.id,
							itemId: item.id,
							itemName: item.name,
						});
				}}
				class="std-btn w-full"
			>
				{#if inWishlist}
					Remove From
				{:else}
					Add To
				{/if} Wishlist
			</button>
		{/if}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
