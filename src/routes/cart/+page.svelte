<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<title>Cart - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="items-container">
	{#each data.cart as i}
		<Item item={i.products} type="cart" />
	{:else}
		<Empty msg="Empty Cart" />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply page items;
	}
</style>
