<script lang="ts">
	import Carousel from "$lib/components/Carousel.svelte";

	import {
		addToCart,
		addToWishlist,
		removeFromWishlist,
	} from "$lib/client/actions";

	let { data } = $props();
	let { supabase, user, products, itemId, cartItem, wishlistItem } =
		$derived(data);

	let item = $derived(products?.find((i: any) => i.id == itemId));
</script>

<!------------------------------------------>

<svelte:head>
	<title>{item.name} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="item-info">
	<div class="carousel-wrapper">
		<Carousel imgs={item.images} alt="Images of {item.name}" />
	</div>

	<div class="item-specifics">
		<div class="side-by-side">
			<h1>{item.name}</h1>
			<p class="inverted-price-tag">
				€{item.cost - item.cost * (item.discount ?? 0)}
			</p>
		</div>
		<p>{item.description}</p>

		{#if user}
			<div class="side-by-side">
				<button
					class="std-btn"
					onclick={() =>
						addToCart({
							supabase,
							userId: user?.id,
							itemId: item.id,
							itemName: item.name,
						})}>Add To Cart</button
				>
				{#if cartItem}
					<p>Already in Cart (x{cartItem.count})</p>
				{/if}
			</div>

			<button
				class="std-btn w-full"
				onclick={() => {
					if (!wishlistItem)
						addToWishlist({
							supabase,
							userId: user?.id,
							itemId: item.id,
							itemName: item.name,
						});
					else
						removeFromWishlist({
							supabase,
							userId: user?.id,
							itemId: item.id,
							itemName: item.name,
						});
				}}
			>
				{#if !wishlistItem}
					Add To
				{:else}
					Remove From
				{/if} Wishlist
			</button>
		{/if}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item-info {
		@apply page page-col page-row-md;

		.carousel-wrapper {
			@apply w-full h-full rounded-xl
			bg-d1 shadow-2xl;
		}

		.item-specifics {
			@apply w-full md:max-w-[33vw] gap-5
			flex flex-col justify-start items-start;
		}
	}
</style>
