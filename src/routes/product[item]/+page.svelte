<script lang="ts">
	import Carousel from "$lib/components/Carousel.svelte";

	import { addToCart, addToWishlist, removeFromWishlist } from "$lib/actions";

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
	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<div class="item-specifics">
		<div class="w-full flex flex-row items-center justify-between">
			<div class="h-full">
				<h1>{item.name}</h1>
				<p>{item.description}</p>
			</div>
			<p class="inverted-price-tag">
				€{item.cost - item.cost * (item.discount ?? 0)}
			</p>
		</div>

		{#if user}
			<div class="w-full flex flex-row justify-between">
				<div class="add-to-cart">
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
			</div>

			{#if !wishlistItem}
				<button
					class="std-btn w-full"
					onclick={() =>
						addToWishlist({
							supabase,
							userId: user?.id,
							itemId: item.id,
							itemName: item.name,
						})}
				>
					Add To Wishlist
				</button>
			{:else}
				<button
					class="std-btn w-full"
					onclick={() =>
						removeFromWishlist({
							supabase,
							userId: user?.id,
							itemId: item.id,
							itemName: item.name,
						})}
				>
					Remove From Wishlist
				</button>
			{/if}
		{/if}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item-info {
		@apply page page-col page-row-md;
	}
	.item-specifics {
		@apply w-full md:max-w-[33vw] gap-5
		flex flex-col justify-start items-start;
	}
	.add-to-cart {
		@apply flex flex-row gap-3 items-center justify-center;
	}
</style>
