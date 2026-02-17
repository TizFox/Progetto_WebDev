<script>
	import Button from "./Button.svelte";

	let { item } = $props();

	function buy() {
		alert("BUYING: " + item.name);
	}
</script>

<!------------------------------------------>

<div class="item">
	<h1 class="item-name">{item.name}</h1>

	<img class="item-img" src={item.img} alt="Image of {item.name}" />

	<div class="item-info">
		<p class="price-tag">{item.cost} €</p>

		<a href="." onclick={buy} class="w-1/3 h-full text-text">
			<Button
				className="border-slate-500 hover:bg-slate-500 dark:border-slate-500 dark:hover:bg-slate-500"
				text="Add To Cart"
			/>
		</a>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "./theme.css";

	.item {
		@apply w-full h-full p-3
		flex flex-col gap-3
		col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3
		bg-slate-200 dark:bg-slate-700 rounded-xl z-1;
	}
	.item-name {
		@apply w-full
		text-center text-xl;
	}
	.item-img {
		@apply w-full h-full max-h-[20vh];
	}
	.item-info {
		@apply w-full h-fit p-3
		flex flex-row justify-between items-center gap-5
		bg-slate-300 dark:bg-slate-600 rounded-lg;
	}

	.price-tag {
		@apply pl-5 pr-10 py-3
		bg-yellow-500 dark:bg-yellow-600 rounded-md
		transition-std hover:-rotate-5;
		clip-path: polygon(0% 0%, 65% 0%, 100% 50%, 65% 100%, 0 100%);
	}
</style>
