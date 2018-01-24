import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "HOME_";
export const ARTICLELIST = `${PRE_FIX}ARTICLELIST`;
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getArticleList = createAction(ARTICLELIST, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getNewsList = createAction(NEWSLIST, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
