<script lang="ts">
	let {
		img,
	}: {
		img: string;
	} = $props();
</script>

<!------------------------------------------>

<a
	href="/profile"
	class="h-full aspect-square
	rounded-full border-2 border-cta
	overflow-hidden"
>
	<img
		src={img}
		alt="User Icon"
		class="w-full h-full object-cover object-center"
	/>
</a>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
