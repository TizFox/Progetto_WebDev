<script lang="ts">
	import { fade } from "svelte/transition";
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
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
		handle = $bindable(null),
		type = "text",
		wClass = "w-full",
		setValue,
		setValid = (v: boolean) => {},
		placeholder,
	}: {
		handle?: { clear: () => void } | null;
		type: InputType;
		wClass?: string;
		setValue: (v: string) => void;
		setValid?: (v: boolean) => void;
		placeholder: string | null;
	} = $props();

	$effect(() => {
		handle = {
			clear: () => {
				inputValue = "";
				setValue("");
				setValid(true);
			},
		};
	});

	let inputValue = $state("");
	let inputValid = $state(true);
	let inputFocus = $state(false);
	let passVisible = $state(false);

	const validate = (value: string): boolean => {
		if (value === "") {
			return true;
		}
		switch (type) {
			case "email":
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
			case "password":
				return value.length >= 6;
			case "search":
			case "text":
				return true;
		}
	};

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
	class="{wClass} h-full relative group
	{type === 'search' ? 'rounded-full shadow-d0 shadow-xl' : 'rounded-lg'}"
>
	{#key inputValid}
		<div
			class="h-1/2 absolute top-1/4 left-3"
			transition:fade={{ duration: 150 }}
		>
			{#if inputValid}
				<Icon
					class="size-7
					transition-std
					group-has-hover:text-cta
					{inputFocus ? 'text-cta' : 'text-dark'}"
				/>
			{:else}
				<X class="size-8 text-error" />
			{/if}
		</div>
	{/key}

	<input
		bind:value={inputValue}
		onfocus={() => (inputFocus = true)}
		onblur={() => (inputFocus = false)}
		oninput={() => {
			inputValid = validate(inputValue);
			setValue(inputValue);
			setValid(inputValid);
		}}
		class="w-full px-11 py-3 bg-d1 outline-none focus:ring-0
		{type === 'search' ? 'rounded-full' : 'rounded-lg'}
		border-2 border-dark transition-std
		group-hover:border-cta focus:border-cta
		base-text text-left truncate"
		type={inputType === "password"
			? passVisible
				? "text"
				: "password"
			: inputType}
		{placeholder}
		autocomplete="off"
	/>
	{#if inputType === "password"}
		<button
			type="button"
			onclick={() => (passVisible = !passVisible)}
			class="h-1/2 absolute top-1/4 right-3"
		>
			{#if passVisible}
				<EyeOff
					class="size-7
						transition-std
						group-has-hover:text-cta
						{inputFocus ? 'text-cta' : 'text-dark'}"
				/>
			{:else}
				<Eye
					class="size-7
						transition-std
						group-has-hover:text-cta
						{inputFocus ? 'text-cta' : 'text-dark'}"
				/>
			{/if}
		</button>
	{/if}
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";
</style>
