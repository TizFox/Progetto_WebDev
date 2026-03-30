<script lang="ts">
	import logo from "$lib/assets/logo.svg";

	import User from "$lib/components/User.svelte";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { data, children } = $props();
	let { supabase, session, user } = $derived(data);

	// In caso di cambiamenti nella Sessione obbliga il Load di tutte le funzioni con depends("supabase:auth")
	onMount(() => {
		supabase.auth.getUser();
		const {
			data: { subscription },
		} = data.supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at != session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={logo} />
</svelte:head>

<!------------------------------------------>

<nav class="navbar-container">
	<div class="navbar">
		<a href="/" class="h-full"
			><img src={logo} alt="Logo" class="h-full" /></a
		>

		<div class="user-actions">
			<a href="/">Home</a>
			<a href="/cart">Cart</a>
			<a href="/wishlist">Wishlist</a>
			<a href="/chronology">Chronology</a>
			{#if user}
				<User img={user.user_metadata.image} />
			{:else}
				<a href="/login" class="std-btn p-5">Login</a>
			{/if}
		</div>
	</div>
</nav>

<section class="divider"></section>

<main class="flex flex-col items-center justify-center">
	{@render children()}
</main>

<footer class="footer-container">
	<div class="footer">
		<a href="/" class="h-full"
			><img src={logo} alt="Logo" class="h-full" /></a
		>
		<div>
			<h1>Rolling Emporium</h1>
			<p>
				By <a target="_blank" href="https://github.com/TizFox">TizFox</a
				>
			</p>
		</div>
	</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	a {
		@apply main-text p-0 hover:underline;
	}

	.navbar-container {
		@apply w-full h-(--navbar-size) z-10
		fixed top-0 left-0;
	}
	.navbar {
		@apply w-full h-full p-5
		flex flex-row justify-start items-center gap-5
		bg-d2 shadow-2xl;

		.user-actions {
			@apply w-full h-full
			flex flex-row justify-end items-center gap-5;
		}
	}

	.divider {
		@apply h-(--navbar-size);
	}

	.footer-container {
		@apply w-full h-(--navbar-size) z-10;
	}
	.footer {
		@apply w-full h-full p-5 gap-3
		flex flex-row items-center justify-center
		bg-d2 shadow-2xl;
	}
</style>
