<script lang="ts">
	import type { PageData } from "./$types";
	const logo = "/logo.svg";

	import User from "$lib/components/User.svelte";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { data, children } = $props();
	let { supabase, session, user }: PageData = $derived(data);

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
			<a href="/history">History</a>
			{#if user}
				<User img={user.user_metadata.image} />
			{:else}
				<a href="/login" class="std-btn p-3">Login</a>
			{/if}
		</div>
	</div>
</nav>

<section class="divider"></section>

<div class="flex items-center justify-center">
	<main class="scene">
		{@render children()}
	</main>
</div>

<footer class="footer-container">
	<div class="footer">
		<a href="/" class="h-full"
			><img src={logo} alt="Logo" class="h-full" /></a
		>
		<div>
			<h1>Rolling Emporium</h1>
			<p>
				By <a
					target="_blank"
					href="https://github.com/TizFox"
					class="main-text">TizFox</a
				>
			</p>
		</div>
	</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	a {
		@apply hover:underline;
	}

	.navbar-container {
		@apply w-full h-(--bars-size) z-10
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
		@apply h-(--bars-size);
	}

	.scene {
		@apply w-full max-w-7xl min-h-(--main-size) p-5;
	}

	.footer-container {
		@apply w-full h-(--bars-size) z-10;
	}
	.footer {
		@apply w-full h-full p-5 gap-3
		flex flex-row items-center justify-center
		bg-d2 shadow-2xl;
	}
</style>
