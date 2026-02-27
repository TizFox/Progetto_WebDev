<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
</script>

<!------------------------------------------>

<svelte:head>
	<title>Chronology - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="items-container">
	{#each data.chronology as i}
		<Item item={i.products} type="chronology" />
	{:else}
		<Empty msg="Empty Chronology" />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply page items;
	}
</style>
