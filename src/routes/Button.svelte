<script lang="ts">
	let { text, lightColor, darkColor } = $props();
</script>

<!------------------------------------------>

<div class="std-btn">
	{text}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "./theme.css";

	.std-btn {
		@apply w-full h-full
		flex justify-center items-center
		transition-std
		rounded-md border-3
		border-(--value(lightColor)) hover:bg-(--value(lightColor))
		dark:border-(--value(darkColor)) dark:hover:bg-(--value(darkColor));
	}
</style>
