/// <reference lib="webworker" />
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", (e: ExtendableEvent) => {
	e.waitUntil(
		caches
			.open("offline")
			.then((cache) => cache.addAll(["/offline", "/logo.svg"])),
	);
	sw.skipWaiting();
});

sw.addEventListener("fetch", (e: FetchEvent) => {
	if (e.request.mode === "navigate") {
		e.respondWith(
			fetch(e.request).catch(
				() => caches.match("/offline") as Promise<Response>,
			),
		);
	}

	// Per la richiesta
	e.respondWith(
		caches.match(e.request).then((cached) => cached ?? fetch(e.request)),
	);
});

sw.addEventListener("push", (e: PushEvent) => {
	if (!e.data) {
		return;
	}

	const { title, body, url } = e.data.json();
	e.waitUntil(
		sw.registration.showNotification(title, {
			body,
			icon: "/pwa-192x192.png",
			data: { url },
		}),
	);
});

sw.addEventListener("notificationclick", (e: NotificationEvent) => {
	e.notification.close();
	const url = e.notification.data?.url ?? "/";
	e.waitUntil(sw.clients.openWindow(url));
});
