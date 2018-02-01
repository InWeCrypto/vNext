import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAIL_";
export const PROJECTDETAIL = `${PRE_FIX}PROJECTDETAIL`;
export const COINTIMEPRICE = `${PRE_FIX}COINTIMEPRICE`;
export const PROJECTREMIND = `${PRE_FIX}PROJECTREMIND`;
export const PROJECTCOLLECT = `${PRE_FIX}PROJECTCOLLECT`;
export const PROJECTDYNAMIC = `${PRE_FIX}PROJECTDYNAMIC`;
export const PROJECTDYNAMICLIST = `${PRE_FIX}PROJECTDYNAMICLIST`;
export const DYNAMICSCROLLLIST = `${PRE_FIX}DYNAMICSCROLLLIST`;
export const PROJECTSCORE = `${PRE_FIX}PROJECTSCORE`;
export const PROJECTDOT = `${PRE_FIX}PROJECTDOT`;
export const PROJECTKCHARTS = `${PRE_FIX}PROJECTKCHARTS`;
export const MARKETS = `${PRE_FIX}MARKETS`;

export const getProjectDetail = createAction(PROJECTDETAIL, params => {
	return http.get({
		url: "category/" + params.c_id
	});
});
export const getCoinTimePrice = createAction(COINTIMEPRICE, params => {
	return http.get({
		url: `ico/rank/${params.ico_type}`
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
	return http.get({
		url: "article/tags",
		params: params
	});
});
export const getProjectDynamicList = createAction(
	PROJECTDYNAMICLIST,
	params => {
		return http.get({
			url: "article",
			params: params
		});
	}
);
export const getDynamicScrollList = createAction(DYNAMICSCROLLLIST, params => {
	return http.get({
		url: "article",
		params: params
	});
});
export const getProjectScore = createAction(PROJECTSCORE, params => {
	return http.put({
		url: `category/${params.c_id}/score`,
		params: params
	});
});
export const unProjectDot = createAction(PROJECTDOT, params => {
	return http.put({
		url: `category/${params.c_id}/undot`,
		params: params
	});
});
export const getKdata = createAction(PROJECTKCHARTS, query => {
	return http.get({
		url: `ico/currencies/${query}`
	});
});
export const getMarkets = createAction(MARKETS, query => {
	return http.get({
		url: `ico/markets/${query}/all`
	});
});
