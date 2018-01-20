import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECT_";
export const PROJECT = `${PRE_FIX}PROJECT`;

export const getProject = createAction(PROJECT, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
