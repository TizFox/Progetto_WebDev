import { browser } from "$app/environment";
import { PUBLIC_VAPID_KEY } from "$env/static/public";

import { logger } from "$lib/logs";

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

		// Si potrebbe salvare "sub" in supabase
		// in modo che l'utente abbia salvate le
		// sue preferenze su tutti i dispositivi
		// però per semplicità ho evitato.
		// Essa viene recuperata dal serviceWorker.
	} catch (e) {
		logger.error(null, `subscribePush(): ${e}`);
	}
}

export async function unsubscribePush(): Promise<void> {
	if (!browser) {
		return;
	}

	// Get Subscription
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	if (!sub) {
		logger.error(null, "Not Subscribed");
		return;
	}

	// Delete Subscription
	let ok = await sub.unsubscribe();
	if (!ok) {
		logger.error(null, "unsubscribePush() Failed");
	}
}

export async function isSubscribed(): Promise<boolean> {
	if (!browser) {
		return false;
	}

	// Get Subscription
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	return sub !== null;
}

export async function notifyPush(
	title: string,
	body: string,
	url: string = "/",
	timeout: number,
): Promise<void> {
	// Get Subscription
	const reg = await navigator.serviceWorker.ready;
	const sub = await reg.pushManager.getSubscription();
	if (!sub) {
		return;
	}

	// Send Push Notification
	await fetch("/api/push", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			subscription: sub,
			title,
			body,
			url,
			timeout,
		}),
	});
}

// -----------------------------

export async function requestPermission(): Promise<boolean> {
	// If not on browser | if it doesn't supports Notification
	if (!browser || !("Notification" in window)) {
		return false;
	}
	// Already Granted
	if (Notification.permission === "granted") {
		return true;
	}

	// Request Permission
	return (await Notification.requestPermission()) === "granted";
}

// Local Notification
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
