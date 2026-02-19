<script>
	import Item from "./Item.svelte";

	// Read JSON for items
	let items = [
		{ name: "A", cost: 3, img: "gallery/logo.svg" },
		{ name: "B", cost: 3, img: "gallery/esercizio_html_css/addicon.png" },
		{ name: "C", cost: 3, img: "gallery/esercizio_html_css/album.png" },
		{ name: "D", cost: 3, img: "gallery/esercizio_html_css/albumbig.png" },
		{
			name: "E",
			cost: 3,
			img: "gallery/esercizio_html_css/arrowdownicon.png",
		},
		{ name: "F", cost: 3, img: "gallery/esercizio_html_css/backicon.png" },
		{ name: "G", cost: 3, img: "gallery/esercizio_html_css/bellicon.png" },
		{ name: "H", cost: 3, img: "gallery/esercizio_html_css/clockicon.png" },
		{ name: "I", cost: 3, img: "gallery/esercizio_html_css/homeicon.png" },
		{ name: "L", cost: 3, img: "gallery/esercizio_html_css/nexticon.png" },
		{
			name: "M",
			cost: 3,
			img: "gallery/esercizio_html_css/nextpageicon.png",
		},
		{ name: "N", cost: 3, img: "gallery/esercizio_html_css/pauseicon.png" },
		{
			name: "O",
			cost: 3,
			img: "gallery/esercizio_html_css/peopleicon.png",
		},
		{ name: "P", cost: 3, img: "gallery/esercizio_html_css/preicon.png" },
		{
			name: "Q",
			cost: 3,
			img: "gallery/esercizio_html_css/searchicon.png",
		},
		{
			name: "R",
			cost: 3,
			img: "gallery/esercizio_html_css/shuffleicon.png",
		},
		{ name: "S", cost: 3, img: "gallery/esercizio_html_css/spotify.png" },
		{ name: "T", cost: 3, img: "gallery/esercizio_html_css/usericon.png" },
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
