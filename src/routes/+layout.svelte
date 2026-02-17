<script lang="ts">
	import favicon from "$lib/assets/favicon.svg";
	import navbarLogo from "$lib/assets/logo.svg";

	import Button from "./Button.svelte";

	let { children } = $props();

	let btn = { A: ".", B: ".", C: ".", D: "." };
</script>

<!------------------------------------------>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<nav class="navbar-container">
	<div class="navbar">
		<img src={navbarLogo} alt="Logo" class="h-full" />

		{#each Object.entries(btn) as [txt, hrf]}
			<a href={hrf} class="h-full aspect-2/1">
				<Button
					--light-color="var(--color-slate-600)"
					--dark-color="var(--color-slate-500)"
					text={txt}
				/>
			</a>
		{/each}
	</div>
</nav>
<div class="divider"></div>

{@render children()}

<footer class="footer-container">
	<div class="footer">END</div>
</footer>

<!------------------------------------------>

<style lang="postcss">
	@import "./theme.css";

	.navbar-container {
		@apply w-full h-(--navbar-size) z-10
		fixed top-0 left-0;
	}
	.navbar {
		@apply w-full h-full p-5
		flex flex-row justify-start items-center gap-5
		bg-slate-400 dark:bg-slate-600 shadow-2xl;
	}

	.divider {
		@apply h-(--navbar-size);
	}

	.footer-container {
		@apply w-full h-(--navbar-size);
	}
	.footer {
		@apply w-full h-full z-10
		flex flex-row justify-center items-center
		bg-slate-400 dark:bg-slate-600 shadow-2xl;
	}
</style>
