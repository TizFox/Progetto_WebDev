<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { supabase, user, wishlist } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Wishlist - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-grid">
	{#if wishlist.length != 0}
		<h1 class="w-full h-fit text-center col-span-12">Wishlist</h1>
		{#each wishlist as i}
			<Item
				item={i.products}
				type="wishlist"
				{supabase}
				userId={user?.id}
			/>
		{/each}
	{:else}
		<Empty msg="Empty Wishlist" />
	{/if}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
