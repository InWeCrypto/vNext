import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "HELPCENTER_";
export const ANNOUNCMENT = `${PRE_FIX}ANNOUNCMENT`;
export const CLEAR = `${PRE_FIX}CLEAR`;

export const clear = createAction(CLEAR);
export const getAnnouncment = createAction(ANNOUNCMENT, params => {
	return http.get({
		url: "article",
		params: params
	});
});

