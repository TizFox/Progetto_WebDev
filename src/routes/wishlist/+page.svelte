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

<section class="page">
	<h1 class="text-center p-5">WISHLIST</h1>
	<div class="page-grid">
		{#each wishlist as i}
			<Item
				item={i.products}
				type="wishlist"
				{supabase}
				userId={user?.id}
			/>
		{:else}
			<Empty msg="Empty Wishlist" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
