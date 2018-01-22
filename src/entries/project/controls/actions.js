import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECT_";
export const PROJECT = `${PRE_FIX}PROJECT`;
export const PROJECTCOLLECT = `${PRE_FIX}PROJECTCOLLECT`;

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
export const getProjectCollect = createAction(PROJECTCOLLECT, params => {
	return http
		.put({
			url: "category/" + params.c_id + "/collect",
			params: { enable: params.enable }
		})
		.then(res => {
			return res;
		});
});
