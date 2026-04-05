const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

const showId = (userId: string | null) => userId ?? "0000-0000-0000-0000";

export const logger = {
	success: (userId: string | null, msg: string) =>
		console.info(green, showId(userId), "- Success:", msg),
	log: (userId: string | null, msg: string) =>
		console.log(blue, showId(userId), "- Log    :", msg),
	warn: (userId: string | null, msg: string) =>
		console.warn(yellow, showId(userId), "- Warn   :", msg),
	error: (userId: string | null, msg: string) =>
		console.error(red, showId(userId), "- Error  :", msg),
};
