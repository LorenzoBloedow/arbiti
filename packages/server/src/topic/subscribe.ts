import { Arbiti } from "@arbiti/core";
import { log } from "../log";

type SubscribeParams = Pick<
	Parameters<typeof Arbiti.topic.subscribe>[0],
	"browserUuid" | "topics"
> & {
	appUuid?: string;
};

export function subscribe(params: SubscribeParams) {
	if (
		!params.appUuid &&
		// @ts-ignore
		(typeof process !== "object" ||
			// @ts-ignore
			typeof process.env !== "object" ||
			// @ts-ignore
			!process.env.ARBITI_APP_UUID) &&
		// Support Next.js actions without needing to repeat the UUID for server and client
		!process.env.NEXT_PUBLIC_ARBITI_APP_UUID
	) {
		throw log(
			"Either setting the 'appUuid' parameter or the 'ARBITI_APP_UUID' environment variable is required",
			"error"
		);
	}

	return Arbiti.topic.subscribe({
		...params,
		// @ts-ignore
		appUuid:
			params.appUuid ||
			process.env.ARBITI_APP_UUID ||
			process.env.NEXT_PUBLIC_ARBITI_APP_UUID,
	});
}