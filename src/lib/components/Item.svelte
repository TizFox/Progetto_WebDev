<script>
	import { addToCart, removeFromCart } from "$lib/cart";
	import { removeFromWishlist } from "$lib/wishlist";

	import Carousel from "$lib/components/Carousel.svelte";

	let { item, type } = $props();
</script>

<!------------------------------------------>

<div class="item">
	<h1 class="item-name">{item.name}</h1>

	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<div class="item-info">
		<p class="price-tag">
			{item.cost - item.cost * (item.discount ?? 0)} €
		</p>

		{#if type === "home"}
			<a href="/product{item.id}" class="std-btn">View More</a>
		{:else if type === "cart"}
			<button onclick={removeFromCart} class="std-btn">Remove</button>
		{:else if type === "wishlist"}
			<button onclick={addToCart} class="std-btn">Add To Cart</button>
			<button onclick={removeFromWishlist} class="std-btn">Remove</button>
		{/if}
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item {
		@apply w-full h-fit p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3
		bg-slate-200 dark:bg-slate-700 rounded-xl z-1;
	}
	.item-name {
		@apply w-full p-3
		flex flex-row justify-center items-center
		bg-slate-300 dark:bg-slate-600 rounded-lg
		text-center text-xl;
	}
	.item-info {
		@apply w-full h-fit p-3
		flex flex-row justify-between items-center gap-5
		bg-slate-300 dark:bg-slate-600 rounded-lg;
	}

	.std-btn {
		@apply w-1/3 h-full;
	}
</style>
