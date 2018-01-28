import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWSIMG_";
export const NEWSIMGL = `${PRE_FIX}NEWSIMGL`;
export const NEWSVIDEOL = `${PRE_FIX}NEWSVIDEOL`;

export const getNewsImg = createAction(NEWSIMGL, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getNewsVideo = createAction(NEWSVIDEOL, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
