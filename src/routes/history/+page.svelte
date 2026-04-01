<script lang="ts">
	import type { PageData } from "./$types.js";
	import Empty from "$lib/components/Empty.svelte";
	import { formatDate } from "$lib/client/actions";

	let { data } = $props();
	let { history }: PageData = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>History - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	{#if history.length !== 0}
		<h1 class="main-text">HISTORY</h1>
	{/if}
	<div class="page page-col flex-col-reverse">
		{#each history as h}
			<a
				href="/order{h.id}"
				class="std-btn w-full
				hover:border-d2 hover:bg-d2 hover:text-dark"
			>
				<div class="side-by-side">
					<p class="text-left">
						<span class="main-text p-0">Order Id</span>: {h.id}<br
						/>
						<span class="main-text p-0">Created</span>: {formatDate(
							h.created_at,
						)}
					</p>
					<p class="inverted-price-tag">Total: €{h.total}</p>
				</div>
			</a>
		{/each}
	</div>
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
