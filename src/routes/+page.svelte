<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<title>Rolling Emporium</title>
</svelte:head>

<section class="items-container">
	{#each data.products as i}
		<Item item={i} type="home" />
	{:else}
		<Empty msg="No Products" />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply page items;
	}
</style>
