<script lang="ts">
	import logo from "$lib/assets/logo.svg";

	let { msg } = $props();
</script>

<!------------------------------------------>

<div class="sad-message">
	<img src={logo} alt="Logo" />
	<span>{msg}</span>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.sad-message {
		@apply absolute top-0 left-0 w-screen h-screen
		flex justify-center items-center gap-10;

		img {
		}

		span {
			@apply text-5xl;
		}
	}
</style>
