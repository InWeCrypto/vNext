import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "APP_";
export const GETSHAREAPP = `${PRE_FIX}GETCODE`;
export const POSTCODE = `${PRE_FIX}POSTCODE`;

export const getOwnCode = createAction(GETSHAREAPP, params => {
	return http
		.get({
			url: "user/ont_candy_bow"
		})
		.then(res => {
			return res;
		});
});

export const postOwnCode = createAction(POSTCODE, code => {
	return http
		.post({
			url: "user/ont_candy_bow",
			params: {
				code
			}
		})
		.then(res => {
			return res;
		});
});
