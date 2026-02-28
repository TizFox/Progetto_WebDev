<script>
	import blankIcon from "$lib/assets/blankuser.svg";

	let { img } = $props();
</script>

<!------------------------------------------>

<a href="/profile" class="h-full aspect-square">
	<img
		src={img === "" ? blankIcon : img}
		alt="User Icon"
		class="w-full h-full rounded-full
		border border-bg-dark dark:border-bg-light"
	/>
</a>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
