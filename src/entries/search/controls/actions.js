import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "SEARCH_";
export const SEARCH = `${PRE_FIX}SEARCH`;

export const getSearch = createAction(SEARCH, params => {
	return http.get({
		url: "search/all",
		params: params
	});
});
