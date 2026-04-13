import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: "autoUpdate",
			devOptions: { enabled: true },

			strategies: "injectManifest",
			srcDir: "src",
			filename: "service-worker.ts",
			injectManifest: {
				injectionPoint: undefined,
			},
			manifest: {
				name: "Rolling Emporium",
				short_name: "R.E.",
				theme_color: "#0f172a", // bg-d0
				scope: "/",
				start_url: "/",
				display: "standalone",
				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
