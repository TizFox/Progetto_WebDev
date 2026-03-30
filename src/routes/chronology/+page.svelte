<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { chronology } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Chronology - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page">
	{#if chronology.length !== 0}
		<h1 class="main-text">CHRONOLOGY</h1>
	{/if}
	<div class="page-grid">
		{#each chronology as i}
			<Item
				item={i.products}
				count={i.count}
				orderId={i.payment_intent_id}
				type="chronology"
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
