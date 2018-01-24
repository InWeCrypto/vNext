import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAIL_";
export const PROJECTDETAIL = `${PRE_FIX}PROJECTDETAIL`;
export const COINTIMEPRICE = `${PRE_FIX}COINTIMEPRICE`;
export const PROJECTREMIND = `${PRE_FIX}PROJECTREMIND`;
export const PROJECTCOLLECT = `${PRE_FIX}PROJECTCOLLECT`;
export const PROJECTDYNAMIC = `${PRE_FIX}PROJECTDYNAMIC`;
export const PROJECTDYNAMICLIST = `${PRE_FIX}PROJECTDYNAMICLIST`;
export const PROJECTSCORE = `${PRE_FIX}PROJECTSCORE`;
export const PROJECTDOT = `${PRE_FIX}PROJECTDOT`;

export const getProjectDetail = createAction(PROJECTDETAIL, params => {
	return http
		.get({
			url: "category/" + params.c_id
		})
		.then(res => {
			return res;
		});
});
export const getCoinTimePrice = createAction(COINTIMEPRICE, params => {
	return http
		.get({
			url: `ico/rank/${params.ico_type}`
		})
		.then(res => {
			return res;
		});
});
export const setProjectRemind = createAction(PROJECTREMIND, params => {
	return http
		.put({
			url: `category/${params.c_id}/follow`,
			params: params
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
export const getProjectDynamic = createAction(PROJECTDYNAMIC, params => {
	return http
		.get({
			url: "article/tags",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getProjectDynamicList = createAction(
	PROJECTDYNAMICLIST,
	params => {
		return http
			.get({
				url: "article",
				params: params
			})
			.then(res => {
				return res;
			});
	}
);
export const getProjectScore = createAction(PROJECTSCORE, params => {
	return http
		.put({
			url: `category/${params.c_id}/score`,
			params: params
		})
		.then(res => {
			if (res.code !== 4000) {
				Msg.prompt(res.msg);
			}
			return res;
		});
});
export const unProjectDot = createAction(PROJECTDOT, params => {
	return http
		.put({
			url: `category/${params.c_id}/undot`,
			params: params
		})
		.then(res => {
			if (res.code !== 4000) {
				Msg.prompt(res.msg);
			}
			return res;
		});
});
