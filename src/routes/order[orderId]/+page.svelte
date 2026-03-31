<script lang="ts">
	import Empty from "$lib/components/Empty.svelte";
	import Item from "$lib/components/Item.svelte";
	import { formatDate } from "$lib/client/actions";

	const { data } = $props();
	const { historyId, orderItems, historyCreatedAt, historyTotal } =
		$derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Order {historyId} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<div class="side-by-side">
		<div>
			<h1 class="main-text text-left pl-0 pb-1">ORDER CONFIRMED</h1>
			<p>Created: {formatDate(historyCreatedAt!)}</p>
		</div>
		<div class="page page-row">
			<p class="inverted-price-tag">
				€{historyTotal}
			</p>
			<button
				onclick={() => {
					navigator.clipboard.writeText(historyId!);
				}}
				class="std-btn">Copy Order Id</button
			>
			<a href="/" class="std-btn">Back to Home</a>
		</div>
	</div>

	<div class="page page-grid">
		{#each orderItems as i}
			<Item item={i.products} count={i.count} type="order" />
		{:else}
			<Empty msg="Empty Order (?)" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
