import webpush from "web-push";
import { json } from "@sveltejs/kit";

import { PUBLIC_VAPID_KEY } from "$env/static/public";
import { SECRET_VAPID_KEY } from "$env/static/private";

webpush.setVapidDetails(
	"mailto:rolling.emporium@gmail.com",
	PUBLIC_VAPID_KEY,
	SECRET_VAPID_KEY,
);

export async function POST({ request }) {
	const { subscription, title, body, url } = await request.json();

	await webpush.sendNotification(
		subscription,
		JSON.stringify({ title, body, url }),
	);

	return json({ ok: true });
}
