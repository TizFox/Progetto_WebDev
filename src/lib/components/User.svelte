<script lang="ts">
	let { img } = $props();
</script>

<!------------------------------------------>

<a href="/profile" class="h-full aspect-square">
	<img
		src={img}
		alt="User Icon"
		class="w-full h-full rounded-full
		border-2 border-cta"
	/>
</a>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
