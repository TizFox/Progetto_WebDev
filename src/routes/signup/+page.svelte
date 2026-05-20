<script lang="ts">
	import type { PageData } from "./$types";
	import { goto } from "$app/navigation";
	import { showToast } from "$lib/client/actions.js";

	import Input from "$lib/components/Input.svelte";

	let { data } = $props();
	let { supabase }: PageData = $derived(data);

	let loading: boolean = $state(false);

	let nickname: string = $state("");
	let email: string = $state("");
	let password1: string = $state("");
	let password2: string = $state("");
	let validNickname = $state(true);
	let validEmail = $state(true);
	let validPassword1 = $state(true);
	let validPassword2 = $state(true);
	let error: string | null = $state(null);

	const handleSignup = async (event: SubmitEvent) => {
		event.preventDefault();
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
			nickname === "" ||
			email === "" ||
			password1 === "" ||
			password2 === "" ||
			password1 !== password2 ||
			!validNickname ||
			!validEmail ||
			!validPassword1 ||
			!validPassword2
		) {
			showToast("error", "SIGNUP", "Invalid Inputs");
			return;
		}

		// Load the Image in the bucked and take the url
		let imageUrl =
			"https://cqvkscgotmwgvwvpvjcp.supabase.co/storage/v1/object/public/user_images/blankuser.svg";

		loading = true;
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password1,
			options: {
				data: {
					nickname: nickname,
					image: imageUrl,
				},
			},
		});
		loading = false;
		if (error) {
			showToast("error", "SIGNUP", error.message);
		} else {
			showToast(
				"success",
				"SIGNUP",
				"Signed Up<br>Check your Email! (Not Active 2 email/h)",
			);

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
	<h1 class="main-text pt-5">SIGNUP</h1>

	<form class="form" onsubmit={handleSignup}>
		<Input
			type="text"
			placeholder="Nickname"
			setValue={(x: string) => (nickname = x)}
			setValid={(x: boolean) => (validNickname = x)}
		/>
		<Input
			type="email"
			placeholder="Email"
			setValue={(x: string) => (email = x)}
			setValid={(x: boolean) => (validEmail = x)}
		/>
		<Input
			type="password"
			placeholder="Password"
			setValue={(x: string) => (password1 = x)}
			setValid={(x: boolean) => (validPassword1 = x)}
		/>
		<Input
			type="password"
			placeholder="Repeat Password"
			setValue={(x: string) => (password2 = x)}
			setValid={(x: boolean) => (validPassword2 = x)}
		/>

		<button type="submit" class="std-btn w-full mt-3" disabled={loading}>
			{loading ? "Loading..." : "Signup"}
		</button>
	</form>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
