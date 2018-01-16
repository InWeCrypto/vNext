import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "CANDYBOWL_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getNewsList = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
