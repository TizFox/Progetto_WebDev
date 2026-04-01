<script lang="ts">
	import { X, Image } from "@lucide/svelte";

	let {
		wClass = "w-full",
		setImage,
		placeholder,
	}: {
		wClass: string;
		setImage: (x: File | null) => void;
		placeholder: string | null;
	} = $props();

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
</script>

<!------------------------------------------>

<div class="{wClass} h-full relative group shadow-d0 shadow-lg rounded-lg">
	<button
		type="button"
		onclick={() => fileInput?.click()}
		class="
		w-full h-full pl-11 py-3 bg-d1 rounded-lg
		border-2 border-dark transition-std
		hover:border-cta
		base-text text-left truncate
		{fileName ? 'text-dark' : 'text-dark/25'}"
	>
		<Image
			class="h-1/2 absolute top-1/4 left-3 transition-std
		text-dark group-hover:text-cta"
		/>
		{fileName ?? placeholder}
	</button>
	<input
		bind:this={fileInput}
		oninput={(e) => {
			let file = e.currentTarget.files?.[0] ?? null;
			fileName = file?.name ?? null;
			setImage(file);
		}}
		class="hidden"
		type="file"
		accept="image/*"
		multiple={false}
	/>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
