<script>
	import Carousel from "$lib/components/Carousel.svelte";

	import {
		addToCart,
		removeFromCart,
		removeFromWishlist,
	} from "$lib/actions";

	let { supabase = null, userId = null, item, count = 0, type } = $props();
</script>

<!------------------------------------------>

<div class="item" class:cart-col-span={type === "cart"}>
	<h2 class="item-name">
		{item.name}
		{#if count != 0}
			(x{count})
		{/if}
	</h2>

	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<div class="item-info">
		<p class="price-tag">
			€{item.cost - item.cost * (item.discount ?? 0)}
		</p>

		<a href="/product{item.id}" class="std-btn">View More</a>
		{#if type === "cart"}
			<button
				onclick={() =>
					removeFromCart({
						supabase,
						userId: userId,
						itemId: item.id,
						itemName: item.name,
					})}
				class="std-btn">Remove</button
			>
		{:else if type === "wishlist"}
			<button
				onclick={() =>
					addToCart({
						supabase,
						userId: userId,
						itemId: item.id,
						itemName: item.name,
					})}
				class="std-btn">Add To Cart</button
			>
			<button
				onclick={() =>
					removeFromWishlist({
						supabase,
						userId: userId,
						itemId: item.id,
						itemName: item.name,
					})}
				class="std-btn">Remove</button
			>
		{/if}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item {
		@apply w-full h-fit p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4
		bg-slate-200 dark:bg-slate-700 rounded-xl;
	}
	.cart-col-span {
		@apply col-span-12 md:col-span-6;
	}
	.item-name {
		@apply w-full p-3 text-center
		bg-slate-300 dark:bg-slate-600 rounded-lg;
	}
	.item-info {
		@apply w-full h-fit p-3
		flex flex-row justify-between items-center
		bg-slate-300 dark:bg-slate-600 rounded-lg;
	}

	.std-btn {
		@apply w-1/3 h-full;
	}
</style>
