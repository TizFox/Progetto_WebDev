<script lang="ts">
	import { ArrowBigLeft, ArrowBigRight } from "@lucide/svelte";

	let { imgs = [], alt = "Image of Product" } = $props();

	let currI = $state(0);

	const prev = () => {
		currI = (currI - 1 + imgs.length) % imgs.length;
	};

	const next = () => {
		currI = (currI + 1) % imgs.length;
	};
</script>

<!------------------------------------------>

<div class="imgs-container">
	{#each imgs as img, i}
		<img
			id={i.toString()}
			class="item-img"
			class:visible={i === currI}
			src={img}
			{alt}
		/>
	{/each}

	<button class="prev group" aria-label="Prev Button" onclick={prev}>
		<ArrowBigLeft
			size="36"
			class="transition-std group-hover:-translate-x-1
			rounded-full border-2 border-lcta dark:border-dcta
			text-lcta dark:text-dcta bg-bg-light dark:bg-bg-dark"
		/>
	</button>
	<button class="next group" aria-label="Next Button" onclick={next}>
		<ArrowBigRight
			size="36"
			class="transition-std group-hover:translate-x-1
			rounded-full border-2 border-lcta dark:border-dcta
			text-lcta dark:text-dcta bg-bg-light dark:bg-bg-dark"
		/>
	</button>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.imgs-container {
		@apply relative w-full h-(--item-size);
	}

	.item-img {
		@apply absolute top-0 left-1/2 -translate-x-1/2 h-full
		transition-std opacity-0;

		&.visible {
			@apply opacity-100;
		}
	}

	button {
		@apply absolute top-1/2 -translate-y-1/2 z-1 p-4
		cursor-pointer;

		&.prev {
			@apply left-0;
		}

		&.next {
			@apply right-0;
		}
	}
</style>
