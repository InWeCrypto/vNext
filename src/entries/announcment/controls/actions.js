import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "ANNOUNCMENT_";
export const ANNOUNCMENT = `${PRE_FIX}ANNOUNCMENT`;

export const getAnnouncment = createAction(ANNOUNCMENT, params => {
	return http.get({
		url: "exchange_notice",
		params: params
	});
});
