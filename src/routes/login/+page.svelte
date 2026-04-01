<script lang="ts">
	import type { PageData } from "./$types.js";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";

	let { data } = $props();
	let { supabase }: PageData = $derived(data);

	let email = $state("");
	let password = $state("");
	let error: string | null = $state(null);

	let loading = $state(false);

	const handleLogin = async (event: SubmitEvent) => {
		event.preventDefault();
		if (loading) return;

		console.log("LOGIN: " + email + " - " + password);

		if (!email || !password) {
			alert("Error: Invalid Inputs");
			return;
		}

		loading = true;
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			alert(error.message);
			loading = false;
		} else {
			goto("/");
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>Login - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<form class="form" onsubmit={handleLogin}>
		<h1 class="part main-text">Login</h1>

		<Input
			type="email"
			wClass="mx-5"
			placeholder="Email"
			setValue={(x: string) => (email = x)}
		/>
		<Input
			type="password"
			wClass="mx-5"
			placeholder="Password"
			setValue={(x: string) => (password = x)}
		/>

		<button type="submit" class="std-btn" disabled={loading}>
			{loading ? "Loading..." : "Login"}
		</button>
	</form>

	<a href="/signup" class="main-text p-0 hover:underline">Create Account</a>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
