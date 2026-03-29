<script>
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";

	let { data } = $props();
	let { supabase, user, cart, total } = $derived(data);
</script>

<!------------------------------------------>

<svelte:head>
	<title>Cart - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page">
	<h1 class="text-center p-5">CART</h1>
	<div class="items-grid">
		<div class="page-grid flex-4">
			{#each cart as i}
				<Item
					item={i.products}
					count={i.count}
					type="cart"
					{supabase}
					userId={user?.id}
				/>
			{:else}
				<Empty msg="Empty Cart" />
			{/each}
		</div>
		{#if cart.length != 0}
			<div class="check-out">
				<div class="info-check-out">
					<h2>CheckOut</h2>
					<p class="important-text">
						Total: €{total}
					</p>
				</div>

				<button id="paypal-button-container" class="std-btn w-full"
					>PayPal</button
				>
			</div>
		{/if}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.items-grid {
		@apply flex flex-col-reverse md:flex-row gap-5;
	}

	.check-out {
		@apply p-5 flex-1 h-fit flex flex-col gap-5
		rounded-xl border-3 border-lcta dark:border-dcta
		bg-slate-400 dark:bg-slate-600 shadow-2xl;
	}
	.info-check-out {
		@apply w-full flex flex-row items-center justify-between md:flex-col md:items-start;
	}
</style>
