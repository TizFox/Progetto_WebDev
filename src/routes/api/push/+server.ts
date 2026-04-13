import webpush from "web-push";
import { json } from "@sveltejs/kit";

import { PUBLIC_VAPID_KEY } from "$env/static/public";
import { SECRET_VAPID_KEY } from "$env/static/private";

webpush.setVapidDetails(
	"mailto:rolling.emporium@gmail.com",
	PUBLIC_VAPID_KEY,
	SECRET_VAPID_KEY,
);

let waitingNotifications = new Map<string, ReturnType<typeof setTimeout>>();

type requestData = {
	subscription: webpush.PushSubscription;
	title: string;
	body: string;
	url: string;
	timeout: number;
};

export async function POST({ request }) {
	const { subscription, title, body, url, timeout }: requestData =
		await request.json();

	const timer = waitingNotifications.get(subscription.endpoint);
	if (timer) {
		// Reset to not send multiple notifications
		clearTimeout(timer);
	}

	waitingNotifications.set(
		subscription.endpoint,
		setTimeout(() => {
			webpush
				.sendNotification(
					subscription,
					JSON.stringify({ title, body, url }),
				)
				.then(() => waitingNotifications.delete(subscription.endpoint));
		}, timeout),
	);

	return json({ ok: true });
}
