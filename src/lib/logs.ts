const green = "\x1b[32m";
const blue = "\x1b[34m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";

export const logger = {
	success: (userId: string | null, msg: string) =>
		console.info(green, userId ?? "", "- Success:", msg),
	log: (userId: string | null, msg: string) =>
		console.log(blue, userId ?? "", "- Log    :", msg),
	warn: (userId: string | null, msg: string) =>
		console.warn(yellow, userId ?? "", "- Warn   :", msg),
	error: (userId: string | null, msg: string) =>
		console.error(red, userId ?? "", "- Error  :", msg),
};
