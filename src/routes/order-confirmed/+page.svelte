<script lang="ts">
	import Empty from "$lib/components/Empty.svelte";
	import Item from "$lib/components/Item.svelte";
	import { formatDate } from "$lib/client/actions";

	const { data } = $props();
	const { order, paymentIntentId } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Order {paymentIntentId} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page flex flex-col gap-5">
	<div class="side-by-side">
		<div>
			<h1 class="main-text text-left pl-0 pb-1">ORDER CONFIRMED</h1>
			<p>Created: {formatDate(order[0].products.created_at)}</p>
		</div>
		<div class="flex flex-row gap-5">
			<button
				onclick={() => {
					navigator.clipboard.writeText(paymentIntentId);
				}}
				class="std-btn">Copy Order Id</button
			>
			<a href="/" class="std-btn">Back to Home</a>
		</div>
	</div>

	<div class="page-grid">
		{#each order as i}
			<Item
				item={i.products}
				count={i.count}
				orderId={paymentIntentId}
				type="order"
			/>
		{:else}
			<Empty msg="Empty Order (?)" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
