<script lang="ts">
	import type { PageData } from "./$types";
	import Input from "$lib/components/Input.svelte";
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { products }: PageData = $derived(data);

	let filter = $state("");
	let filteredProducts = $derived(products);
	$effect(() => {
		filteredProducts = products.filter((p) =>
			p.name.toLowerCase().includes(filter.trim().toLowerCase()),
		);
	});
</script>

<!------------------------------------------>

<svelte:head>
	<title>Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

{#if products.length !== 0}
	<section>
		<div
			class="fixed z-10 top-(--bars-size) left-0 w-full flex items-center justify-center py-5"
		>
			<Input
				type="search"
				wClass="w-3/4 max-w-7xl"
				placeholder="Search by Name"
				setValue={(x: string) => (filter = x)}
			/>
		</div>
		<div class="page page-grid mt-20">
			{#each filteredProducts as i}
				<Item item={i} type="home" />
			{:else}
				<Empty msg="Nothing Found" />
			{/each}
		</div>
	</section>
{:else}
	<Empty msg="No Products" />
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
