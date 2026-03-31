<script lang="ts">
	import { goto } from "$app/navigation";
	import Empty from "$lib/components/Empty.svelte";
	import { formatDate } from "$lib/client/actions";

	let { data } = $props();
	let { history } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>History - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col flex-col-reverse">
	{#if history.length !== 0}
		<h1 class="main-text">HISTORY</h1>
	{/if}
	{#each history as h}
		<button
			class="std-btn w-full
				hover:border-d2 hover:bg-d2 hover:text-dark"
			onclick={() => goto(`/order${h.id}`)}
		>
			<div class="side-by-side">
				<p class="text-left">
					Order Id: {h.id}<br />
					Created: {formatDate(h.created_at)}
				</p>
				<p class="inverted-price-tag">Total: €{h.total}</p>
			</div>
		</button>
	{/each}
</section>

{#if history.length === 0}
	<div class="w-full h-full">
		<Empty msg="Empty History" />
	</div>
{/if}

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
