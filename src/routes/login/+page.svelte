<script lang="ts">
	let loginEmail = $state("");
	let loginPassword = $state("");

	let registerEmail = $state("");
	let registerPassword1 = $state("");
	let registerPassword2 = $state("");

	let loading = $state(false);

	const handleLogin = async () => {
		console.log("LOGIN: " + loginEmail + " - " + loginPassword);

		if (loginEmail == "" || loginPassword == "") {
			alert("Invalid Inputs");
			return;
		}

		/*try {
			const { error } = await supabaseClient.auth.signInWithPassword({
				email: loginEmail,
				password: loginPassword,
			});
			if (error) throw error;
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		}*/
	};

	const handleRegister = async () => {
		console.log(
			"REGISTER: " +
				registerEmail +
				" - " +
				registerPassword1 +
				" == " +
				registerPassword2,
		);

		if (
			registerEmail == "" ||
			registerPassword1 == "" ||
			registerPassword2 == "" ||
			registerPassword1 != registerPassword2
		) {
			alert("Invalid Inputs");
			return;
		}

		/*	try {
			const { data, error } = await supabase.auth.signUp({
				email: registerEmail,
				password: registerPassword1,
			});
			if (error) throw error;

			console.log(data);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
			}*/
	};
</script>

<div class="form-container">
	<div class="form">
		<h1>Login</h1>

		<div class="relative">
			<input
				id="email"
				class="floating-input peer"
				type="email"
				placeholder=""
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
				placeholder=""
				autocomplete="off"
				bind:value={loginPassword}
			/>
			<label class="floating-label" for="password">Password</label>
		</div>

		<button class="std-btn" onclick={handleLogin}>Login</button>
	</div>
	<div class="form">
		<h1>Register</h1>

		<div class="relative">
			<input
				id="registerEmail"
				class="floating-input peer"
				type="email"
				placeholder=""
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
				placeholder=""
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
				placeholder=""
				autocomplete="off"
				bind:value={registerPassword2}
			/>
			<label class="floating-label" for="registerPassword2">
				Repeat Password
			</label>
		</div>

		<button class="std-btn" onclick={handleRegister}>Register</button>
	</div>
</div>

<style lang="postcss">
	@import "$lib/theme.css";

	.form-container {
		@apply h-(--main-size) flex justify-center items-center p-10 gap-20
		flex-col md:flex-row;
	}
</style>
