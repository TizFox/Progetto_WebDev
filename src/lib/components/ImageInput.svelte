<script lang="ts">
	import { X, Image } from "@lucide/svelte";

	let {
		handle = $bindable(null),
		wClass = "w-full",
		setImage,
		placeholder,
	}: {
		handle?: { clear: () => void } | null;
		wClass?: string;
		setImage: (x: File | null) => void;
		placeholder: string | null;
	} = $props();

	$effect(() => {
		handle = {
			clear: () => {
				fileInput!.value = "";
				fileName = null;
				setImage(null);
			},
		};
	});

	let fileInput = $state<HTMLInputElement | null>(null);
	let fileName = $state<string | null>(null);
</script>

<!------------------------------------------>

<div class="{wClass} h-full relative group rounded-lg">
	<button
		type="button"
		onclick={() => fileInput?.click()}
		class="
		w-full h-full px-11 py-3 bg-d1 rounded-lg
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
			let file = fileInput?.files?.[0] ?? null;
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
