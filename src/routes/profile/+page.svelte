<script lang="ts">
	import blankIcon from "$lib/assets/blankuser.svg";

	import { goto } from "$app/navigation";

	let { data } = $props();
	let { supabase, session, user } = $derived(data);

	let img = $derived(user?.user_metadata.image);
	let nickname = $derived(user?.user_metadata.nickname);
	let email = $derived(user?.email);
	let created_at = $derived(user?.created_at);

	let newImage = $state(<FileList>{});
	let newNickname = $state("");
	let newEmail = $state("");
	let newPassword = $state("");

	const changeImage = async () => {
		console.log(newImage.item(0));
	};

	const changeNickname = async () => {};

	const changeEmail = async () => {};

	const changePassword = async () => {};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			alert("SignOut Error");
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
			alert("DeleteUser Error");
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

<section class="profile-container">
	<img
		src={img === "" ? blankIcon : img}
		alt="Your Avatar"
		class="profile-picture"
	/>

	<div>
		<span>{nickname}</span>
		<span>{email}</span>
		<span>{created_at}</span>
	</div>

	<div class="form items">
		<div class="input-field">
			<input
				id="newNickname"
				class="floating-input peer"
				type="text"
				placeholder="..."
				autocomplete="off"
				bind:value={newNickname}
			/>
			<label class="floating-label" for="newNickname">
				New Nickname
			</label>
			<button type="button" onclick={changeNickname} class="std-btn">
				Change Nickname
			</button>
		</div>

		<div class="input-field">
			<input
				id="newNickname"
				class="floating-input peer"
				type="file"
				accept="image/*"
				bind:files={newImage}
			/>
			<label class="floating-label" for="newNickname"> New Image </label>
			<button type="button" onclick={changeImage} class="std-btn">
				Change Image
			</button>
		</div>

		<div class="input-field">
			<input
				id="newEmail"
				class="floating-input peer"
				type="email"
				placeholder="..."
				autocomplete="off"
				bind:value={newEmail}
			/>
			<label class="floating-label" for="newEmail"> New Email </label>
			<button type="button" onclick={changeEmail} class="std-btn">
				Change Email
			</button>
		</div>

		<div class="input-field">
			<input
				id="newPassword"
				class="floating-input peer"
				type="email"
				placeholder="..."
				autocomplete="off"
				bind:value={newPassword}
			/>
			<label class="floating-label" for="newPassword">
				New Password
			</label>
			<button type="button" onclick={changePassword} class="std-btn">
				Change Password
			</button>
		</div>
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

	.profile-container {
		@apply page
		flex justify-center items-center flex-col gap-5;

		.profile-picture {
			@apply w-1/2 aspect-square rounded-full
			border border-bg-dark dark:border-bg-light;
		}

		.input-field {
			@apply relative col-span-6 md:col-span-3;
		}

		.std-btn {
			@apply w-full;
			&.danger {
				@apply border-red-600 hover:bg-red-600
					dark:border-red-400 hover:dark:bg-red-400;
			}
		}

		.danger-zone {
			@apply w-full flex flex-row px-5 gap-5;
		}
	}
</style>
