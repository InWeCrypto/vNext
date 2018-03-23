import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "HELPCENTER_";
export const ANNOUNCMENT = `${PRE_FIX}ANNOUNCMENT`;
export const ANNOUNCMENTM = `${PRE_FIX}ANNOUNCMENTM`;

export const getAnnouncment = createAction(ANNOUNCMENT, params => {
	return http.get({
		url: "exchange_notice",
		params: params
	});
});

export const getAnnouncmentM = createAction(ANNOUNCMENTM, params => {
	return http.get({
		url: "exchange_notice",
		params: params
	});
});
