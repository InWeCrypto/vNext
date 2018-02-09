import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "SEARCH_";
export const SEARCH = `${PRE_FIX}SEARCH`;
export const SEARCHPRO = `${PRE_FIX}SEARCHPRO`;

export const getSearch = createAction(SEARCH, params => {
	return http.get({
		url: "search/all",
		params: params
	});
});
export const getSearchPro = createAction(SEARCHPRO, params => {
	return http.get({
		url: "category",
		params: params
	});
});
