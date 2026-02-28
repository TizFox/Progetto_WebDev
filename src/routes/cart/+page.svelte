<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { supabase, user, cart } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Cart - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-grid">
	{#if cart.length != 0}
		<h1 class="w-full text-center col-span-12">Cart</h1>
		{#each cart as i}
			<Item item={i.products} type="cart" {supabase} userId={user?.id} />
		{/each}
		<button class="std-btn col-span-12" onclick={() => alert("BUY")}
			>--- BUY ---</button
		>
	{:else}
		<Empty msg="Empty Cart" />
	{/if}
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
