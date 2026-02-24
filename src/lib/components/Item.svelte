<script>
	import Carousel from "./Carousel.svelte";

	let { item } = $props();

	const buy = () => {
		alert("BUYING: " + item.name);
	};
</script>

<!------------------------------------------>

<div class="item">
	<h1 class="item-name">{item.name}</h1>

	<Carousel imgs={item.images} alt="Images of {item.name}" />

	<div class="item-info">
		<p class="price-tag">
			{item.cost - item.cost * (item.discount ?? 0)} €
		</p>

		<button onclick={buy} class="std-btn">View More</button>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.item {
		@apply w-full h-fit p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3
		bg-slate-200 dark:bg-slate-700 rounded-xl z-1;
	}
	.item-name {
		@apply w-full p-3
		flex flex-row justify-center items-center
		bg-slate-300 dark:bg-slate-600 rounded-lg
		text-center text-xl;
	}
	.item-info {
		@apply w-full h-fit p-3
		flex flex-row justify-between items-center gap-5
		bg-slate-300 dark:bg-slate-600 rounded-lg;
	}

	.price-tag {
		@apply pl-5 pr-10 py-3
		text-tx-light
		bg-lcta dark:bg-dcta rounded-md
		transition-std hover:-rotate-5;
		clip-path: polygon(0% 0%, 65% 0%, 100% 50%, 65% 100%, 0 100%);
	}
	.std-btn {
		@apply w-1/3 h-full;
	}
</style>
