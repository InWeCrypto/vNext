import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTOPEN_";
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
			if (res.code === 4000 && res.data && res.data.id) {
				return {
					code: res.code,
					data: res.data,
					msg: res.msg
				};
			}
			return res;
		});
});
