import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECT_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getProjectOpen = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
