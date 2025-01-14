import { Arbiti } from "@arbiti/core";
import { log } from "../log";

type UnsubscribeParams = Pick<
	Parameters<typeof Arbiti.topic.unsubscribe>[0],
	"browserUuid" | "topics"
> & {
	appUuid?: string;
};

export function unsubscribe(params: UnsubscribeParams) {
	if (
		!params.appUuid &&
		!process.env.ARBITI_APP_UUID &&
		!process.env.NEXT_PUBLIC_ARBITI_APP_UUID
	) {
		throw log(
			"Either setting the 'appUuid' parameter or the 'ARBITI_APP_UUID' environment variable is required",
			"error"
		);
	}

	return Arbiti.topic.unsubscribe({
		...params,
		// @ts-ignore
		appUuid:
			params.appUuid ||
			process.env.ARBITI_APP_UUID ||
			process.env.NEXT_PUBLIC_ARBITI_APP_UUID,
	});
}
