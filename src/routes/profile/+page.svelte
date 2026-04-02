<script lang="ts">
	import type { PageData } from "./$types.js";
	import { invalidateAll, goto } from "$app/navigation";
	import Input from "$lib/components/Input.svelte";
	import ImageInput from "$lib/components/ImageInput.svelte";
	import { formatDate, imageToWebp } from "$lib/client/actions.js";

	let { data } = $props();
	let { supabase, user }: PageData = $derived(data);

	let nickname = $derived(user?.user_metadata.nickname);
	let img = $derived(user?.user_metadata.image);
	let email = $derived(user?.email);
	let created_at = $derived(user?.created_at);

	let newNickname = $state("");
	let newNicknameValid = $state(true);
	let newNicknameHandle = $state<{ clear: () => void } | null>(null);
	let newImage = $state<File | null>(null);
	let newImageHandle = $state<{ clear: () => void } | null>(null);
	let newPassword = $state("");
	let newPasswordValid = $state(true);
	let newPasswordHandle = $state<{ clear: () => void } | null>(null);

	const changeNickname = async () => {
		if (newNickname == "" || !newNicknameHandle) {
			return;
		}
		console.log(newNickname);

		const { error } = await supabase.auth.updateUser({
			data: { nickname: newNickname },
		});
		if (error) {
			alert(error.message);
		} else {
			alert("Success: New Nickname Saved");
			newNicknameHandle?.clear();
			await invalidateAll();
		}
	};
	const changeImage = async () => {
		if (!newImage) {
			return;
		}

		// Image => Webp
		const webpImage = await imageToWebp(newImage, 0.8);
		const filePath = `${user!.id}/profileImage.webp`;

		// Upload to Bucket
		const { error: storageError } = await supabase.storage
			.from("user_images")
			.upload(filePath, webpImage, {
				contentType: "image/webp",
				upsert: true,
			});
		if (storageError) {
			alert(storageError.message);
			return;
		}

		// Get public url
		const { data: newImageUrl } = supabase.storage
			.from("user_images")
			.getPublicUrl(filePath);

		// Update user info
		const { error } = await supabase.auth.updateUser({
			data: { image: newImageUrl.publicUrl + `?t=${Date.now()}` },
		});
		if (error) {
			alert(error.message);
		} else {
			alert("Success: New Image Saved");
			newImageHandle?.clear();
			await invalidateAll();
		}
	};
	const changePassword = async () => {
		if (newPassword == "" || !newPasswordValid) {
			return;
		}
		console.log(newPassword);
		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		});
		if (error) {
			alert(error.message);
		} else {
			alert("Success: New Password Saved");
			newPasswordHandle?.clear();
			await invalidateAll();
		}
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
		)
			?.trim()
			.toUpperCase();

		if (confirm !== "I WANT TO DELETE MY ACCOUNT") {
			return;
		}

		const res = await fetch("/api/delete-account", {
			method: "POST",
		});
		const result = await res.json();

		if (result.success) {
			alert(`Account ${user!.id} Deleated`);
			invalidateAll();
		} else {
			alert(result.error);
		}
	};
</script>

<!------------------------------------------>

<svelte:head>
	<title>{nickname} - Rolling Emporium</title>
</svelte:head>

<!------------------------------------------>

<section class="page page-col">
	<div
		class="w-1/2 md:w-3/10 aspect-square
		rounded-full border-2 border-cta
		overflow-hidden"
	>
		<img
			src={img}
			class="w-full h-full object-cover object-center"
			alt="Your Avatar"
		/>
	</div>

	<div>
		<h1 class="w-full main-text p-5">{nickname}</h1>
		<h2><span class="main-text">Email</span>: {email}</h2>
		<h2>
			<span class="main-text">Created</span>: {formatDate(created_at!)}
		</h2>
	</div>

	<div class="page page-grid form">
		<div class="page page-col gap-1 col-span-6 md:col-span-4">
			<Input
				type="text"
				placeholder="New Nickname"
				setValue={(x: string) => (newNickname = x)}
				setValid={(x: boolean) => (newNicknameValid = x)}
				bind:handle={newNicknameHandle}
			/>
			<button
				type="button"
				onclick={changeNickname}
				class="std-btn w-full"
				disabled={newNickname === "" || !newNicknameValid}
			>
				Change Nickname
			</button>
		</div>

		<div class="page page-col gap-1 col-span-6 md:col-span-4">
			<ImageInput
				placeholder="New Image"
				setImage={(x: File | null) => (newImage = x)}
				bind:handle={newImageHandle}
			/>
			<button
				type="button"
				onclick={changeImage}
				class="std-btn w-full"
				disabled={!newImage}
			>
				Change Image
			</button>
		</div>

		<div class="page page-col gap-1 col-span-12 md:col-span-4">
			<Input
				type="password"
				placeholder="New Password"
				setValue={(x: string) => (newPassword = x)}
				setValid={(x: boolean) => (newPasswordValid = x)}
				bind:handle={newPasswordHandle}
			/>
			<button
				type="button"
				onclick={changePassword}
				class="std-btn w-full"
				disabled={newPassword === "" || !newPasswordValid}
			>
				Change Password
			</button>
		</div>
	</div>

	<div class="w-full page page-row px-5">
		<button type="button" onclick={logout} class="std-btn w-full">
			Logout
		</button>

		<button
			type="button"
			onclick={deleteAccount}
			class="std-btn w-full border-err hover:bg-err"
		>
			Delete Account
		</button>
	</div>
</section>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
