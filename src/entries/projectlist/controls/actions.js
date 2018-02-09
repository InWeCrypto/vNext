import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTLIST_";
export const PROJECT = `${PRE_FIX}PROJECT`;
export const PROJECT2 = `${PRE_FIX}PROJECT2`;
export const PROJECT3 = `${PRE_FIX}PROJECT3`;
export const PROJECT4 = `${PRE_FIX}PROJECT4`;

export const PROJECTM = `${PRE_FIX}PROJECTM`;
export const ICORANK = `${PRE_FIX}ICORANK`;
export const PROJECTM2 = `${PRE_FIX}PROJECTM2`;
export const PROJECTM3 = `${PRE_FIX}PROJECTM3`;
export const PROJECTM4 = `${PRE_FIX}PROJECTM4`;
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
export const getIcoRank = createAction(ICORANK, params => {
	return http.post({
		url: "ico/ranks",
		params: params
	});
});

export const getProject2 = createAction(PROJECT2, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProject3 = createAction(PROJECT3, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProject4 = createAction(PROJECT4, params => {
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
export const getProjectM = createAction(PROJECTM, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProjectM2 = createAction(PROJECTM2, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProjectM3 = createAction(PROJECTM3, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProjectM4 = createAction(PROJECTM4, params => {
	return http
		.get({
			url: "category",
			params: params
		})
		.then(res => {
			return res;
		});
});
