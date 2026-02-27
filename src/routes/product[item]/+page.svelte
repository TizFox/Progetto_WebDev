<script lang="ts">
	import { addToCart } from "$lib/cart";
	import { addToWishlist } from "$lib/wishlist";

	import Carousel from "$lib/components/Carousel.svelte";

	let { data } = $props();

	let item = $derived(data.products?.find((i) => i.id == data.itemId));
</script>

<!------------------------------------------>

<svelte:head>
	<title>{item.name} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="item-specifics">
	<h1>{item.name}</h1>

	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<p>{item.description}</p>

	<p class="price-tag">
		{item.cost - item.cost * (item.discount ?? 0)} €
	</p>
	{#if data.user}
		<div>
			<button class="std-btn" onclick={addToCart}>Add To Cart</button>
			<button class="std-btn" onclick={addToWishlist}>
				Add To Wishlist
			</button>
		</div>
	{/if}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item-specifics {
		@apply page;
	}
</style>
