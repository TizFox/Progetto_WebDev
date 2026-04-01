<script lang="ts">
	import type { PageData } from "./$types.js";
	import { goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";
	import ImageInput from "$lib/components/ImageInput.svelte";
	import { formatDate } from "$lib/client/actions.js";

	let { data } = $props();
	let { supabase, user }: PageData = $derived(data);

	let img = $derived(user?.user_metadata.image);
	let nickname = $derived(user?.user_metadata.nickname);
	let email = $derived(user?.email);
	let created_at = $derived(user?.created_at);

	let newNickname = $state("");
	let newImage = $state(<File | null>{});
	let newEmail = $state("");
	let newPassword = $state("");

	const changeNickname = async () => {
		console.log(newNickname);
	};
	const changeImage = async () => {
		console.log(newImage);
	};
	const changeEmail = async () => {
		console.log(newEmail);
	};
	const changePassword = async () => {
		console.log(newPassword);
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert(error.message);
		} else {
			goto("/");
		}
	};

	const deleteAccount = async () => {
		let confirm = prompt(
			`DELEATING YOUR ACCOUNT
This action is not reversible!
Type "I want to delete my account" to confirm.`,
		)?.toUpperCase();

		if (confirm !== "I want to delete my account".toUpperCase() || !user) {
			return;
		}

		const { data, error } = await supabase.auth.admin.deleteUser(user.id);
		if (error) {
			alert(error.message);
		} else {
			goto("/");
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>{nickname} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<img src={img} alt="Your Avatar" class="profile-picture" />

	<div>
		<h1 class="w-full main-text">{nickname}</h1>
		<h2>Email: {email}</h2>
		<h2>
			Created: {formatDate(created_at!)}
		</h2>
	</div>

	<div class="page page-grid form">
		<Input
			type="text"
			wClass="col-span-3"
			placeholder="New Nickname"
			setValue={(x: string) => (newNickname = x)}
		/>

		<ImageInput
			wClass="col-span-3"
			placeholder="New Image"
			setImage={(x: File | null) => (newImage = x)}
		/>

		<Input
			type="email"
			wClass="col-span-3"
			placeholder="New Email"
			setValue={(x: string) => (newEmail = x)}
		/>

		<Input
			type="password"
			wClass="col-span-3"
			placeholder="New Password"
			setValue={(x: string) => (newPassword = x)}
		/>
		<button
			type="button"
			onclick={changeNickname}
			class="std-btn col-span-3"
		>
			Change Nickname
		</button>

		<button type="button" onclick={changeImage} class="std-btn col-span-3">
			Change Image
		</button>

		<button type="button" onclick={changeEmail} class="std-btn col-span-3">
			Change Email
		</button>

		<button
			type="button"
			onclick={changePassword}
			class="std-btn col-span-3"
		>
			Change Password
		</button>
	</div>

	<div class="danger-zone">
		<button type="button" onclick={logout} class="std-btn"> Logout </button>

		<button type="button" onclick={deleteAccount} class="std-btn danger">
			Delete Account
		</button>
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.profile-picture {
		@apply w-1/3 aspect-square rounded-full
			border-2 border-cta;
	}

	.input-field {
		@apply relative col-span-6 md:col-span-3;
	}

	.std-btn {
		@apply w-full;
		&.danger {
			@apply border-err hover:bg-err;
		}
	}

	.danger-zone {
		@apply w-full flex flex-row px-5 gap-5;
	}
</style>
