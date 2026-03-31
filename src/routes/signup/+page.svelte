<script lang="ts">
	import { goto } from "$app/navigation";

	let { data } = $props();
	let { supabase } = $derived(data);

	let nickname = $state("");
	let email = $state("");
	let password1 = $state("");
	let password2 = $state("");

	let loading = $state(false);

	const handleSignup = async () => {
		if (loading) return;

		console.log(
			"SIGNUP: " +
				nickname +
				" : " +
				email +
				" - " +
				password1 +
				" == " +
				password2,
		);

		if (
			nickname == "" ||
			email == "" ||
			password1 == "" ||
			password2 == "" ||
			password1 != password2
		) {
			alert("Error: Invalid Inputs");
			return;
		}

		// Load the Image in the bucked and take the url
		let imageUrl =
			"https://cqvkscgotmwgvwvpvjcp.supabase.co/storage/v1/object/public/user_images/blankuser.svg";

		loading = true;
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password1,
			options: {
				data: {
					nickname: nickname,
					image: imageUrl,
				},
			},
		});
		if (error) {
			alert(error.message);
			loading = false;
		} else {
			alert("Check your Email! (Not Active 2 email/h)");
			loading = false;
			goto("/");
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>Signup - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<div class="form">
		<h1 class="part main-text">Signup</h1>

		<div class="relative">
			<input
				id="nickname"
				class="floating-input peer"
				type="text"
				placeholder="..."
				autocomplete="off"
				bind:value={nickname}
			/>
			<label class="floating-label" for="nickname">Nickname</label>
		</div>

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
				id="password1"
				class="floating-input peer"
				type="password"
				placeholder="..."
				autocomplete="off"
				bind:value={password1}
			/>
			<label class="floating-label" for="password1">Password</label>
		</div>

		<div class="relative">
			<input
				id="password2"
				class="floating-input peer"
				type="password"
				placeholder="..."
				autocomplete="off"
				bind:value={password2}
			/>
			<label class="floating-label" for="password2">
				Repeat Password
			</label>
		</div>

		<button class="std-btn" onclick={handleSignup} disabled={loading}>
			{loading ? "Loading..." : "Signup"}
		</button>
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
