<script lang="ts">
	import { Frown } from "@lucide/svelte";

	let { msg } = $props();
</script>

<!------------------------------------------>

<div class="sad-message">
	<Frown size="100px" class="text-cta" />
	<h1 class="main-text">{msg}</h1>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.sad-message {
		@apply absolute top-0 left-0 w-screen h-screen
		flex items-center justify-center gap-5;
	}
</style>
