import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAIL_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getProjectDetail = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
