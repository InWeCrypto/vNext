import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAILICO_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getProjectDetailIco = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
