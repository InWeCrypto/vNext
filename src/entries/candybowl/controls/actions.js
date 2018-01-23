import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "CANDYBOWL_";
export const CANDYLIST = `${PRE_FIX}CANDAYLIST`;
export const CANDYMONTH = `${PRE_FIX}CANDYMONTH`;
export const CANDYWARN = `${PRE_FIX}CANDYWARN`;

export const getCandyList = createAction(CANDYLIST, query => {
	return http.get({
		url: `candy_bow${query}`
	});
});
export const getCandyMonth = createAction(CANDYMONTH, query => {
	return http
		.get({
			url: `candy_bow${query}`
		})
		.then(res => {
			if (
				res.code === 4000 &&
				res.data &&
				res.data.data &&
				res.data.data.length > 0
			) {
				let arr = [];
				res.data.data.map((item, index) => {
					arr.push(`${item.year}-${item.month}-${item.day}`);
				});
				return {
					code: res.code,
					data: arr,
					msg: res.msg
				};
			} else {
				return {
					code: res.code,
					data: [],
					msg: res.msg
				};
			}
		});
});
export const changeCandyWarn = createAction(CANDYWARN, params => {
	return http
		.post({
			url: "candy_bow",
			params: params
		})
		.then(res => {
			if (res.code === 4000) {
				if (res.data.user_id) {
					return {
						code: res.code,
						msg: res.msg,
						data: res.data
					};
				} else {
					return {
						code: res.code,
						msg: res.msg,
						data: null
					};
				}
			}
			return res;
		});
});
