import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAIL_";
export const PROJECTDETAIL = `${PRE_FIX}PROJECTDETAIL`;
export const COINTIMEPRICE = `${PRE_FIX}COINTIMEPRICE`;
export const PROJECTREMIND = `${PRE_FIX}PROJECTREMIND`;
export const PROJECTCOLLECT = `${PRE_FIX}PROJECTCOLLECT`;

export const getProjectDetail = createAction(PROJECTDETAIL, params => {
	return http
		.get({
			url: "category/" + params.c_id
		})
		.then(res => {
			console.log(res);
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
