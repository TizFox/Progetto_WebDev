<script lang="ts">
	import type { PageData } from "./$types";
	import Empty from "$lib/components/Empty.svelte";
	import Item from "$lib/components/Item.svelte";
	import { formatDate } from "$lib/client/utils";

	import { notifyWhen } from "$lib/client/notifications.js";

	const { data } = $props();
	const {
		isNewOrder,
		historyId,
		orderItems,
		historyCreatedAt,
		historyTotal,
	}: PageData = $derived(data);

	$effect(() => {
		notifyWhen(isNewOrder, "Ordine Creato", {
			body: "Il tuo ordine è stao creato correttamente.",
		});
	});
</script>

<!------------------------------------------>

<svelte:head>
	<title>Order {historyId} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<div class="w-full page page-col gap-5">
		<div class="side-by-side pt-5">
			<div>
				<h1 class="main-text text-left pb-1">ORDER CONFIRMED</h1>
				<p>Created: {formatDate(historyCreatedAt)}</p>
			</div>
			<p class="inverted-price-tag">
				€{historyTotal}
			</p>
		</div>
		<div class="side-by-side gap-5">
			<button
				type="button"
				onclick={() => {
					navigator.clipboard.writeText(historyId!);
				}}
				class="std-btn w-full">Copy Order Id</button
			>
			<a href="/" class="std-btn w-full">Back to Home</a>
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
