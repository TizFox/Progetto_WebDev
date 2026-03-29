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

<section class="page">
	<h1 class="text-center p-5">CHRONOLOGY</h1>
	<div class="page-grid">
		{#each chronology as i}
			<Item
				item={i.products}
				type="chronology"
				{supabase}
				userId={user?.id}
			/>
		{:else}
			<Empty msg="Empty Chronology" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
