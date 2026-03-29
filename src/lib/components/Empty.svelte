<script lang="ts">
	import { Frown } from "@lucide/svelte";

	let { msg } = $props();
</script>

<!------------------------------------------>

<div class="sad-message">
	<Frown size="100px" class="text-lcta dark:text-dcta" />
	<h1 class="font-bold text-lcta dark:text-dcta">{msg}</h1>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.sad-message {
		@apply absolute top-0 left-0 w-screen h-screen
		flex items-center justify-center gap-5;
	}
</style>
