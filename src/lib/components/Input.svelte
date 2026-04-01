<script lang="ts">
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
	import { fade } from "svelte/transition";
	import {
		X,
		TextCursorInput,
		Search,
		Mail,
		LockKeyhole,
		Eye,
		EyeOff,
	} from "@lucide/svelte";

	type InputType = "text" | "search" | "email" | "password";

	let {
		inputElement = $bindable(null),
		type = "text",
		wClass = "w-full",
		setValue,
		placeholder,
	}: {
		inputElement?: HTMLInputElement | null;
		type: InputType;
		wClass: string;
		setValue: (v: string) => void;
		placeholder: string | null;
	} = $props();

	let inputValid = $state(true);
	let inputFocus = $state(false);
	let passVisible = $state(false);

	const iconMap: Record<InputType, Component<IconProps>> = {
		text: TextCursorInput,
		search: Search,
		email: Mail,
		password: LockKeyhole,
	};

	const Icon = $derived(iconMap[type] ?? TextCursorInput);
	const inputType = $derived(type === "search" ? "text" : type);
</script>

<!------------------------------------------>

<div
	class="{wClass} h-full relative group shadow-d0 shadow-lg
	{type === 'search' ? 'rounded-full' : 'rounded-lg'}"
>
	{#key inputValid}
		<div
			class="h-1/2 absolute top-1/4 left-3"
			transition:fade={{ duration: 150 }}
		>
			{#if inputValid}
				<Icon
					class="w-full h-full transition-std
					{inputFocus ? 'text-cta' : 'text-dark'}"
				/>
			{:else}
				<X class="w-full h-full text-err" />
			{/if}
		</div>
	{/key}

	<input
		bind:this={inputElement}
		oninput={(e) => {
			setValue(e.currentTarget.value);
		}}
		class="w-full pl-11 py-3 bg-d1 outline-none focus:ring-0
		{type === 'search' ? 'rounded-full' : 'rounded-lg'}
		border-2 border-dark transition-std
		focus:border-cta
		base-text text-left truncate"
		type={inputType === "password"
			? passVisible
				? "text"
				: "password"
			: inputType}
		{placeholder}
		minlength={type === "password" ? 6 : 0}
		autocomplete="off"
		onfocus={() => (inputFocus = true)}
		onblur={() => {
			inputFocus = false;
			inputValid = inputElement?.validity.valid ?? true;
		}}
	/>
	{#if inputType === "password"}
		{#key passVisible}
			<button
				type="button"
				onclick={() => (passVisible = !passVisible)}
				class="h-1/2 absolute top-1/4 right-3"
				transition:fade={{ duration: 100 }}
			>
				{#if passVisible}
					<EyeOff
						class="transition-std {inputFocus
							? 'text-cta'
							: 'text-dark'}"
					/>
				{:else}
					<Eye
						class="transition-std {inputFocus
							? 'text-cta'
							: 'text-dark'}"
					/>
				{/if}
			</button>
		{/key}
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
