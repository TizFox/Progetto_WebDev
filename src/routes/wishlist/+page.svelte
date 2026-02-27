<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<title>Wishlist - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="items-container">
	{#each data.wishlist as i}
		<Item item={i.products} type="wishlist" />
	{:else}
		<Empty msg="Empty Wishlist" />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply page items;
	}
</style>
