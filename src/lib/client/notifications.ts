import { browser } from "$app/environment";
import { PUBLIC_VAPID_KEY } from "$env/static/public";

// -----------------------------

function urlBase64ToUint8Array(base64: string): ArrayBuffer {
	const padding = "=".repeat((4 - (base64.length % 4)) % 4);
	const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
	return Uint8Array.from([...atob(b64)].map((c) => c.charCodeAt(0))).buffer;
}

export async function subscribePush(): Promise<void> {
	if (!browser) {
		return;
	}

	// Check if User accept
	const granted = await requestPermission();
	if (!granted) {
		return;
	}
	// Create Subscription
	try {
		const reg = await navigator.serviceWorker.ready;
		const sub = await reg.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
		});

		console.log("subscribePush() =>", sub ? "true" : "false");
	} catch (e) {
		console.error("subscribePush() erro:", e);
	}
}

export async function unsubscribePush(): Promise<void> {
	if (!browser) {
		return;
	}
	// Delete Subscription
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	let ok = true;
	if (sub) {
		ok = await sub.unsubscribe();
	}

	if (!ok) {
		console.log("unsubscribePush() => false");
	} else {
		console.log("unsubscribePush() => true");
	}
}

export async function isSubscribed(): Promise<boolean> {
	if (!browser) {
		return false;
	}
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	console.log("isSubscribed() =>", sub !== null);
	return sub !== null;
}

export async function notifyPush(
	title: string,
	body: string,
	url: string = "/",
): Promise<void> {
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	if (!sub) {
		return;
	}

	await fetch("/api/push", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			subscription: sub,
			title,
			body,
			url,
		}),
	});
}

// -----------------------------

export async function requestPermission(): Promise<boolean> {
	if (!browser || !("Notification" in window)) {
		return false;
	}
	if (Notification.permission === "granted") {
		return true;
	}

	return (await Notification.requestPermission()) === "granted";
}

export function notify(title: string, options?: NotificationOptions): void {
	if (!browser || Notification.permission !== "granted") {
		return;
	}
	new Notification(title, {
		icon: "/pwa-192x192.png",
		...options,
	});
}

export function notifyWhen(
	cond: boolean,
	title: string,
	options?: NotificationOptions,
): void {
	if (cond) {
		notify(title, options);
	}
}
