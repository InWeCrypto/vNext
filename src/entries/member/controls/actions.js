import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "MEMBER_";
export const COLLECTION = `${PRE_FIX}COLLECTION`;
export const QUOTATION = `${PRE_FIX}QUOTATION`;
export const UPLOADKEY = `${PRE_FIX}UPLOADKEY`;
export const UPLOADERHEADER = `${PRE_FIX}UPLOADERHEADER`;
export const SETPROJECTCOLLETION = `${PRE_FIX}SETPROJECTCOLLETION`;
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
export const getUploadKey = createAction(UPLOADKEY, type => {
	console.log(type);
	return http
		.get({
			url: `upload/${type}?get_oss_policy`
		})
		.then(res => {
			console.log(res);
			return res;
		});
});
export const setProjectColletion = createAction(
	SETPROJECTCOLLETION,
	(id, state) => {
		return http
			.post({
				url: `category/${id}/collect`,
				params: {
					enable: state
				}
			})
			.then(res => {
				console.log(res);
				return res;
			});
	}
);
