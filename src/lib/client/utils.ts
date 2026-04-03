export function getHEX(variable: string): string {
	if (typeof window === "undefined") {
		return "";
	}
	return getComputedStyle(document.documentElement)
		.getPropertyValue(variable)
		.trim();
}

function twoDigit(n: number): string {
	return (Math.floor(n / 10) == 0 ? "0" : "") + n;
}
export function formatDate(s: string): string {
	let date = new Date(s);
	return `${twoDigit(date.getDate())} / ${twoDigit(date.getMonth() + 1)} / ${date.getFullYear()} - ${twoDigit(date.getHours())}:${twoDigit(date.getMinutes())}`;
}

export function imageToWebp(file: File, quality = 0.8): Promise<Blob> {
	return new Promise((res, rej) => {
		const img = new Image();
		const url = URL.createObjectURL(file);

		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;

			const ctx = canvas.getContext("2d");
			ctx?.drawImage(img, 0, 0);

			canvas.toBlob(
				(blob) => {
					URL.revokeObjectURL(url);
					if (blob) {
						res(blob);
					} else {
						rej(new Error("Conversion Failed"));
					}
				},
				"image/webp",
				quality,
			);
		};

		img.onerror = () => {
			URL.revokeObjectURL(url);
			rej(new Error("Upload Failed"));
		};

		img.src = url;
	});
}
