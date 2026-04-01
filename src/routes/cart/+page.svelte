<script lang="ts">
	import type { PageData } from "./$types.js";
	import Item from "$lib/components/Item.svelte";
	import Empty from "$lib/components/Empty.svelte";
	import { getHEX } from "$lib/client/actions";

	let { data } = $props();
	let { supabase, user, cart, total }: PageData = $derived(data);

	import { onMount } from "svelte";
	import type { Stripe, StripeElements } from "@stripe/stripe-js";
	import { loadStripe } from "@stripe/stripe-js";
	import { Elements, PaymentElement } from "svelte-stripe";

	import { PUBLIC_STRIPE_KEY } from "$env/static/public";

	let stripe = $state<Stripe | null>();
	let clientSecret = $state<string | null>(null);
	let error = $state<string | null>();
	let elements = $state<StripeElements | undefined>(undefined);
	let elementsReady = $state(false);

	let processing = $state(false);

	const appearance = {
		theme: "night" as const,
		labels: "floating" as const,
		variables: {
			colorText: getHEX("--color-light"),
			colorIcon: getHEX("--color-light"),
			colorPrimary: getHEX("--color-cta"),
		},
		rules: {
			".Input": {
				border: `1px solid ${getHEX("--color-light")}`,
			},
			".Input:focus": {
				border: `1px solid ${getHEX("--color-cta")}`,
				outline: "none",
			},
		},
	};

	onMount(async () => {
		processing = true;
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
		if (cart.length > 0) {
			const res = await fetch("/api/create-payment-intent", {
				method: "POST",
			});

			const result = await res.json();
			clientSecret = result.clientSecret;
		}
		processing = false;
	});

	async function handleSubmit() {
		if (!stripe || !elements) {
			return;
		}

		processing = true;
		error = null;

		const result = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${window.location.origin}/orderNEW`,
			},
		});

		if (result.error) {
			error = result.error.message ?? "Payment Failed";
			processing = false;
		}
	}
</script>

<!------------------------------------------>

<svelte:head>
	<title>Cart - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	{#if cart.length != 0}
		<h1 class="main-text pt-5">CART</h1>
	{/if}
	{#if cart.length != 0}
		<div
			class="mx-auto p-5 w-full md:w-1/2 h-fit flex flex-col gap-5
		bg-d1 shadow-2xl rounded-xl border-2 border-cta"
		>
			<div
				class="w-full flex flex-row items-center justify-between md:flex-col md:items-start"
			>
				<h2>CheckOut</h2>
				<p class="important-text">
					Total: €{total}
				</p>
			</div>
			<form onsubmit={handleSubmit} class="w-full flex flex-col gap-5">
				{#if stripe && clientSecret}
					<Elements
						{stripe}
						{clientSecret}
						{appearance}
						bind:elements
					>
						<PaymentElement
							onready={() => (elementsReady = true)}
						/>
					</Elements>
				{:else}
					<p>Loading...</p>
				{/if}

				{#if error}
					<p class="w-full error-text p-0 text-left">
						{error}
					</p>
				{/if}

				<button
					class="std-btn w-full"
					type="submit"
					disabled={processing ||
						!elementsReady ||
						!stripe ||
						!clientSecret}
				>
					{processing ? "Loading..." : `Pay €${total}`}
				</button>
			</form>
		</div>
	{/if}
	<div class="page page-grid">
		{#each cart as i}
			<Item
				item={i.products}
				count={i.count}
				type="cart"
				{supabase}
				userId={user ? user.id : null}
			/>
		{:else}
			<Empty msg="Empty Cart" />
		{/each}
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
