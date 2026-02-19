<script lang="ts">
	let { text } = $props();
</script>

<!------------------------------------------>

<div class="std-btn">
	{text}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "./theme.css";

	.std-btn {
		@apply w-full h-full p-2
		flex justify-center items-center
		transition-std
		rounded-md border-3
		border-(--light-color) hover:bg-(--light-color)
		dark:border-(--dark-color) dark:hover:bg-(--dark-color);
	}
</style>
