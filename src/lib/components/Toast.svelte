<script lang="ts">
	import type { Component } from "svelte";
	import type { IconProps } from "@lucide/svelte";
	import { CircleCheck, Info, TriangleAlert, CircleX } from "@lucide/svelte";

	type ToastType = "success" | "info" | "warning" | "error";

	type ToastProps = {
		type: ToastType;
		title: string;
		message: string;
	};

	let { type, title, message }: ToastProps = $props();

	const backgroundStyle: Record<ToastType, string> = {
		success: "bg-success/30",
		info: "bg-info/30",
		warning: "bg-warning/30",
		error: "bg-error/30",
	};

	const iconMap: Record<ToastType, Component<IconProps>> = {
		success: CircleCheck,
		info: Info,
		warning: TriangleAlert,
		error: CircleX,
	};

	const Icon = $derived(iconMap[type]);
</script>

<!------------------------------------------>

<div class="toast-container" class:hover:border-succes={type === "success"}>
	<div class="toast {backgroundStyle[type]}">
		<Icon class="size-7" />

		<div class="toast-msg">
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	</div>
</div>

<!------------------------------------------>

<style lang="postcss">
	@import "$lib/theme.css";

	.toast-container {
		@apply bg-d2 z-10 rounded-xl;
	}
	.toast {
		@apply w-full h-full p-3 gap-3
		flex flex-row justify-center items-center
		rounded-xl border-2 transition-std
		border-dark/30 hover:border-dark;
	}
	.toast-msg {
		@apply flex-1
		flex flex-col justify-center items-start;
	}
</style>
