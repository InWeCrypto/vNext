import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWS_";
export const NEWSDETAIL = `${PRE_FIX}NEWSDETAIL`;

export const getNewsDetail = createAction(NEWSDETAIL, params => {
	return http
		.get({
			url: "article/" + params.art_id
		})
		.then(res => {
			return res;
		});
});
