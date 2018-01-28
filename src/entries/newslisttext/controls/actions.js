import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWSTEXT_";
export const NEWSTEXTL = `${PRE_FIX}NEWSTEXTL`;

export const getNewsText = createAction(NEWSTEXTL, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
