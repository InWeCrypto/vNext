import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "ANNOUNCMENt_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getAnnouncment = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
