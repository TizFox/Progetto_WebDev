<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { supabase, user, chronology } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Chronology - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-grid">
	{#if chronology.length != 0}
		<h1 class="w-full text-center col-span-12">Chronology</h1>
		{#each chronology as i}
			<Item
				item={i.products}
				type="chronology"
				{supabase}
				userId={user?.id}
			/>
		{/each}
	{:else}
		<Empty msg="Empty Chronology" />
	{/if}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
