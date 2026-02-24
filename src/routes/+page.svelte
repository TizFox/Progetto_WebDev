<script>
	import Item from "$lib/components/Item.svelte";
	export let data;
</script>

<!------------------------------------------>

<section class="items-container">
	{#each data.products as i}
		<Item item={i} />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply w-full min-h-(--main-size) p-5
		grid auto-rows-fr grid-cols-12 gap-5;
	}
</style>
