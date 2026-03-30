<script lang="ts">
	import blankIcon from "$lib/assets/blankuser.svg";

	let { img } = $props();
</script>

<!------------------------------------------>

<a href="/profile" class="h-full aspect-square">
	<img
		src={img === "" ? blankIcon : img}
		alt="User Icon"
		class="w-full h-full rounded-full
		border-2 border-cta"
	/>
</a>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
