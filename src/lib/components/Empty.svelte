<script lang="ts">
	import { Frown } from "@lucide/svelte";

	let {
		msg,
	}: {
		msg: string;
	} = $props();
</script>

<!------------------------------------------>

<div class="sad-message">
	<Frown size="100px" class="text-cta" />
	<h1 class="main-text p-5">{msg}</h1>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.sad-message {
		@apply absolute top-0 left-0 w-screen h-screen
		flex justify-center items-center gap-5;
	}
</style>
