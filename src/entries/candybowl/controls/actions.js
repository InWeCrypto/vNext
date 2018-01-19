import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "CANDYBOWL_";
export const CANDAYLIST = `${PRE_FIX}CANDAYLIST`;

export const getCandyList = createAction(CANDAYLIST, query => {
	return http.get({
		url: `candy_bow${query}`
	});
});
