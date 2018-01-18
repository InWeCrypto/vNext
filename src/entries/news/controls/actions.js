import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWS_";
export const NEWSTEXT = `${PRE_FIX}NEWSTEXT`;
export const NEWSIMG = `${PRE_FIX}NEWSIMG`;
export const NEWSVIDEO = `${PRE_FIX}NEWSVIDEO`;

export const getNewsText = createAction(NEWSTEXT, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getNewsImg = createAction(NEWSIMG, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getNewsVideo = createAction(NEWSVIDEO, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
