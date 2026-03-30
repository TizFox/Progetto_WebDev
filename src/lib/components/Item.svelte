<script lang="ts">
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
		orderId = null,
		type,
	} = $props();
</script>

<!------------------------------------------>

<div class="item" class:cart-col-span={type === "cart"}>
	<div class="item-name">
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

	<div class="item-info">
		<a href="/product{item.id}" class="std-btn">View More</a>
		{#if type === "order" || type === "chronology"}
			<button
				onclick={() => {
					navigator.clipboard.writeText(orderId);
				}}
				class="std-btn">Copy Order Id</button
			>
		{:else if type === "cart"}
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
		bg-d1 rounded-xl;
	}
	.cart-col-span {
		@apply col-span-12 md:col-span-6;
	}
	.item-name {
		@apply side-by-side p-3 bg-d2 rounded-lg;
	}
	.item-info {
		@apply w-full h-fit p-3 gap-3
		flex flex-row justify-between items-center
		bg-d2 rounded-lg;
	}
</style>
