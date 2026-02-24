<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import navbarLogo from "$lib/assets/logo.svg";

	import User from "$lib/components/User.svelte";

	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";

	let { data, children } = $props();
	let { supabase, session } = $derived(data);

	onMount(() => {
		const { data } = supabase.auth.ouAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Rolling Emporium</title>

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
			<a href="/login" class="std-btn">Login</a>
			<User />
		</div>
	</div>
</nav>

<section class="divider"></section>

{@render children()}

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
