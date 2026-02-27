<script lang="ts">
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

	<button class="prev" aria-label="Prev Button" onclick={prev}>
		<i class="fa-solid fa-angle-left fa-xl"></i>
	</button>
	<button class="next" aria-label="Next Button" onclick={next}>
		<i class="fa-solid fa-angle-right fa-xl"></i>
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
		@apply absolute top-1/2 -translate-y-1/2 z-10 p-4
		cursor-pointer;

		&.prev {
			@apply left-0;
			&:hover i {
				@apply -translate-x-1;
			}
		}

		&.next {
			@apply right-0;
			&:hover i {
				@apply translate-x-1;
			}
		}

		i {
			@apply transition-std;
		}
	}
</style>
