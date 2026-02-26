<script>
	import Item from "$lib/components/Item.svelte";

	let { data } = $props();
</script>

<section>
	<div class="items-container">
		{#each data.cart as i}
			<Item item={i.products} />
		{/each}
	</div>
</section>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-container {
		@apply w-full min-h-(--main-size) p-5
		grid auto-rows-fr grid-cols-12 gap-5;
	}
</style>
