<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import navbarLogo from "$lib/assets/logo.svg";

	import User from "$lib/components/User.svelte";

	import { goto, invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { data, children } = $props();
	let { supabase, session, user, products } = $derived(data);

	// Chiama la funzione di Logout e riporta l'utente nella pagina home

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
	<link rel="icon" href={favicon} />

	<script
		src="https://kit.fontawesome.com/ba06ebf7f1.js"
		crossorigin="anonymous"
	></script>
</svelte:head>

<!------------------------------------------>

<nav class="navbar-container">
	<div class="navbar">
		<img src={navbarLogo} alt="Logo" class="h-full" />

		<a href="/" class="std-btn">Home</a>

		<div class="user-actions">
			<a href="/cart">Cart</a>
			<a href="/wishlist">Wishlist</a>
			<a href="/chronology">Chronology</a>
			{#if user}
				<User img={user.user_metadata.image} />
			{:else}
				<a href="/login" class="std-btn">Login</a>
			{/if}
		</div>
	</div>
</nav>

<section class="divider"></section>

<main class="flex justify-center items-center">
	{@render children()}
</main>

<footer class="footer-container">
	<div class="footer">END</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.navbar-container {
		@apply w-full h-(--navbar-size) z-10
		fixed top-0 left-0;
	}
	.navbar {
		@apply w-full h-full p-5
		flex flex-row justify-start items-center gap-5
		bg-slate-400 dark:bg-slate-600 shadow-2xl;

		.std-btn {
			@apply h-full aspect-2/1;
		}

		.user-actions {
			@apply w-full h-full
			flex flex-row justify-end items-center gap-5;

			a {
				@apply hover:underline;
			}
		}
	}

	.divider {
		@apply h-(--navbar-size);
	}

	.footer-container {
		@apply w-full h-(--footer-size) z-10;
	}
	.footer {
		@apply w-full h-full z-10
		flex flex-row justify-center items-center
		bg-slate-400 dark:bg-slate-600 shadow-2xl;
	}
</style>
