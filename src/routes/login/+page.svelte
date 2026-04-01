<script lang="ts">
	import type { PageData } from "./$types.js";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";

	let { data } = $props();
	let { supabase }: PageData = $derived(data);

	let loading = $state(false);

	let email = $state("");
	let password = $state("");
	let validEmail = $state(true);
	let validPassword = $state(true);
	let error: string | null = $state(null);

	const handleLogin = async (event: SubmitEvent) => {
		event.preventDefault();
		if (loading) return;

		console.log("LOGIN: " + email + " - " + password);

		if (!email || !password || !validEmail || !validPassword) {
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
	<h1 class="main-text pt-5">LOGIN</h1>
	<form class="form" onsubmit={handleLogin}>
		<Input
			type="email"
			placeholder="Email"
			setValue={(x: string) => (email = x)}
			setValid={(x: boolean) => (validEmail = x)}
		/>
		<Input
			type="password"
			placeholder="Password"
			setValue={(x: string) => (password = x)}
			setValid={(x: boolean) => (validPassword = x)}
		/>

		<button type="submit" class="std-btn w-full mt-3" disabled={loading}>
			{loading ? "Loading..." : "Login"}
		</button>
	</form>

	<a href="/signup" class="main-text hover:underline">Create Account</a>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
