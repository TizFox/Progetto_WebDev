<script lang="ts">
	import type { PageData } from "./$types.js";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";

	let { data } = $props();
	let { supabase }: PageData = $derived(data);

	let nickname: string = $state("");
	let email: string = $state("");
	let password1: string = $state("");
	let password2: string = $state("");

	let loading: boolean = $state(false);

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
			alert(error.message);
		} else {
			alert("Check your Email! (Not Active 2 email/h)");
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
	<form class="form" onsubmit={handleSignup}>
		<h1 class="part main-text">Signup</h1>

		<Input
			type="text"
			wClass="mx-5"
			placeholder="Nickname"
			setValue={(x: string) => (nickname = x)}
		/>
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
			setValue={(x: string) => (password1 = x)}
		/>
		<Input
			type="password"
			wClass="mx-5"
			placeholder="Repeat Password"
			setValue={(x: string) => (password2 = x)}
		/>

		<button type="submit" class="std-btn" disabled={loading}>
			{loading ? "Loading..." : "Signup"}
		</button>
	</form>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
