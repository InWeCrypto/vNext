import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "MEMBER_";
export const COLLECTION = `${PRE_FIX}COLLECTION`;
export const QUOTATION = `${PRE_FIX}QUOTATION`;
export const getCollectionList = createAction(COLLECTION, query => {
	return http.get({
		url: `category?user_favorite${query}` //
	});
});
export const getQuotationList = createAction(QUOTATION, query => {
	return http.get({
		url: `category?user_follow${query}` //
	});
});
