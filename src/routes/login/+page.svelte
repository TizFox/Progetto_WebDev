<script lang="ts">
	import { goto } from "$app/navigation";

	let { data } = $props();
	let { supabase } = $derived(data);

	let email = $state("");
	let password = $state("");

	let loading = $state(false);

	const handleLogin = async () => {
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
	<div class="form">
		<h1 class="part main-text">Login</h1>

		<div class="relative">
			<input
				id="email"
				class="floating-input peer"
				type="email"
				placeholder="..."
				autocomplete="off"
				bind:value={email}
			/>
			<label class="floating-label" for="email">Email</label>
		</div>

		<div class="relative">
			<input
				id="password"
				class="floating-input peer"
				type="password"
				placeholder="..."
				autocomplete="off"
				bind:value={password}
			/>
			<label class="floating-label" for="password">Password</label>
		</div>

		<button
			type="submit"
			class="std-btn"
			onclick={handleLogin}
			disabled={loading}
		>
			{loading ? "Loading..." : "Login"}
		</button>
	</div>

	<a href="/signup" class="main-text p-0 hover:underline">Create Account</a>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
