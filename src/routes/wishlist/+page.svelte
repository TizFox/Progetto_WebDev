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

<section>
	{#if wishlist.length !== 0}
		<h1 class="main-text">WISHLIST</h1>
	{/if}
	<div class="page page-grid">
		{#each wishlist as i}
			<Item
				item={i.products}
				type="wishlist"
				{supabase}
				userId={user?.id}
			/>
		{/each}
	</div>
</section>

{#if wishlist.length === 0}
	<div class="w-full h-full flex items-center justify-center">
		<Empty msg="Empty History" />
	</div>
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
