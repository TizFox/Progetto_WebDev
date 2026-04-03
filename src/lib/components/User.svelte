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
	class="h-full aspect-square overflow-hidden
	rounded-full border-2
	border-dark transition-std
	hover:border-cta"
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
