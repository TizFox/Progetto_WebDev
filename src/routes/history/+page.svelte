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

<section class="page">
	{#if history.length !== 0}
		<h1 class="main-text">HISTORY</h1>
	{/if}
	<div class="page-col flex-col-reverse">
		{#each history as i}
			<button
				class="std-btn w-full
				hover:border-d2 hover:bg-d2 hover:text-dark"
				onclick={() =>
					goto(
						`/order-confirmed?payment_intent=${i.payment_intent_id}`,
					)}
			>
				<div class="side-by-side">
					<p class="text-left">
						Order Id: {i.payment_intent_id}<br />
						Created: {formatDate(i.created_at)}
					</p>
					<p class="inverted-price-tag">Total: €{i.total}</p>
				</div>
			</button>
		{:else}
			<Empty msg="Empty History" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
