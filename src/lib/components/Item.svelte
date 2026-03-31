<script lang="ts">
	import Carousel from "$lib/components/Carousel.svelte";

	import {
		addToCart,
		removeFromCart,
		removeFromWishlist,
	} from "$lib/client/actions";

	let { supabase = null, userId = null, item, count = 0, type } = $props();

	let actionsInfo = $derived({
		supabase,
		userId,
		itemId: item.id,
		itemName: item.name,
	});
</script>

<!------------------------------------------>

<div
	class="w-full h-fit p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4
		bg-d1 rounded-xl"
>
	<div class="side-by-side p-3 bg-d2 rounded-lg">
		<h1>
			{item.name}
			{#if count != 0}
				(x{count})
			{/if}
		</h1>
		<p class="inverted-price-tag">
			€{item.cost - item.cost * (item.discount ?? 0)}
		</p>
	</div>

	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<div
		class="w-full h-fit p-3 gap-3
	flex flex-row justify-between items-center
	bg-d2 rounded-lg"
	>
		<a href="/product{item.id}" class="std-btn">View More</a>
		{#if type === "cart"}
			<button onclick={() => removeFromCart(actionsInfo)} class="std-btn"
				>Remove</button
			>
		{:else if type === "wishlist"}
			<button onclick={() => addToCart(actionsInfo)} class="std-btn"
				>Add To Cart</button
			>
			<button
				onclick={() => removeFromWishlist(actionsInfo)}
				class="std-btn">Remove</button
			>
		{/if}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
