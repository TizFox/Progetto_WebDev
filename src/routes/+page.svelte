<script>
	import Item from "./Item.svelte";

	// Read JSON for items
	let items = [
		{ name: "A", cost: 3, img: "gallery/logo.svg" },
		{ name: "B", cost: 3, img: "gallery/logo.svg" },
		{ name: "C", cost: 3, img: "gallery/logo.svg" },
		{ name: "D", cost: 3, img: "gallery/logo.svg" },
		{ name: "E", cost: 3, img: "gallery/logo.svg" },
		{ name: "F", cost: 3, img: "gallery/logo.svg" },
		{ name: "G", cost: 3, img: "gallery/logo.svg" },
		{ name: "H", cost: 3, img: "gallery/logo.svg" },
		{ name: "I", cost: 3, img: "gallery/logo.svg" },
	];
</script>

<!------------------------------------------>

<section class="items-container">
	{#each items as i}
		<Item item={i} />
	{/each}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "./theme.css";

	.items-container {
		@apply w-full h-full p-5
		grid auto-rows-fr grid-cols-12 gap-5;
	}
</style>
