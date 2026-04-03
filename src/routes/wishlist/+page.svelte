<script lang="ts">
	import type { PageData } from "./$types";
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { supabase, user, wishlist }: PageData = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Wishlist - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

{#if wishlist.length !== 0}
	<section>
		<h1 class="main-text pt-5">WISHLIST</h1>

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
{:else}
	<Empty msg="Empty Wishlist" />
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
