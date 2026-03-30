<script lang="ts">
	import Empty from "$lib/components/Empty.svelte";
	import Item from "$lib/components/Item.svelte";

	const { data } = $props();
	const { order, paymentIntentId } = $derived(data);
</script>

<section class="page flex flex-col gap-5">
	<h1 class="main-text">ORDER CONFIRMED</h1>
	<h2>Order Code: {paymentIntentId}</h2>
	<a href="/" class="std-btn w-1/4">Back to Home</a>
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

<style lang="postcss">
	@import "$lib/theme.css";
</style>
