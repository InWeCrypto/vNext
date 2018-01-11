import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWS_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getNews = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
