<script lang="ts">
	import { goto } from "$app/navigation";

	let { data } = $props();
	let { supabase } = $derived(data);

	let loginEmail = $state("");
	let loginPassword = $state("");

	let registerNickname = $state("");
	let registerEmail = $state("");
	let registerPassword1 = $state("");
	let registerPassword2 = $state("");

	let loading = $state(false);

	const handleLogin = async () => {
		if (loading) return;

		console.log("LOGIN: " + loginEmail + " - " + loginPassword);

		if (!loginEmail || !loginPassword) {
			alert("Invalid Inputs");
			return;
		}

		loading = true;
		const { error } = await supabase.auth.signInWithPassword({
			email: loginEmail,
			password: loginPassword,
		});
		if (error) {
			alert(error.message);
			loading = false;
		} else {
			goto("/");
		}
	};

	const handleRegister = async () => {
		if (loading) return;

		console.log(
			"REGISTER: " +
				registerNickname +
				" : " +
				registerEmail +
				" - " +
				registerPassword1 +
				" == " +
				registerPassword2,
		);

		if (
			registerNickname == "" ||
			registerEmail == "" ||
			registerPassword1 == "" ||
			registerPassword2 == "" ||
			registerPassword1 != registerPassword2
		) {
			alert("Invalid Inputs");
			return;
		}

		loading = true;
		const { data, error } = await supabase.auth.signUp({
			email: registerEmail,
			password: registerPassword1,
			options: {
				data: {
					nickname: registerNickname,
					image: "",
				},
			},
		});
		if (error) {
			alert(error.message);
			loading = false;
		} else {
			alert("Check your Email! (Not Active 2 email/h)");
			goto("/");
			loading = false;
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>Login - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="form-container">
	<div class="form">
		<h1>Login</h1>

		<div class="relative">
			<input
				id="email"
				class="floating-input peer"
				type="email"
				placeholder="..."
				autocomplete="off"
				bind:value={loginEmail}
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
				bind:value={loginPassword}
			/>
			<label class="floating-label" for="password">Password</label>
		</div>

		<button type="submit" class="std-btn" onclick={handleLogin}>
			{loading ? "Loading..." : "Login"}
		</button>
	</div>
	<div class="form">
		<h1>Register</h1>

		<div class="relative">
			<input
				id="registerNickname"
				class="floating-input peer"
				type="text"
				placeholder="..."
				autocomplete="off"
				bind:value={registerNickname}
			/>
			<label class="floating-label" for="registerNickname">Nickname</label
			>
		</div>

		<div class="relative">
			<input
				id="registerEmail"
				class="floating-input peer"
				type="email"
				placeholder="..."
				autocomplete="off"
				bind:value={registerEmail}
			/>
			<label class="floating-label" for="registerEmail">Email</label>
		</div>

		<div class="relative">
			<input
				id="registerPassword1"
				class="floating-input peer"
				type="password"
				placeholder="..."
				autocomplete="off"
				bind:value={registerPassword1}
			/>
			<label class="floating-label" for="registerPassword1"
				>Password</label
			>
		</div>

		<div class="relative">
			<input
				id="registerPassword2"
				class="floating-input peer"
				type="password"
				placeholder="..."
				autocomplete="off"
				bind:value={registerPassword2}
			/>
			<label class="floating-label" for="registerPassword2">
				Repeat Password
			</label>
		</div>

		<button class="std-btn" onclick={handleRegister}>
			{loading ? "Loading..." : "Register"}
		</button>
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.form-container {
		@apply page
		flex justify-center items-center gap-10
		flex-col md:flex-row;
	}
</style>
