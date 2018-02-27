import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "CANDYBOWL_";
export const CANDYLIST = `${PRE_FIX}CANDAYLIST`;
export const CANDYBOW = `${PRE_FIX}CANDYBOW`;
export const CANDYMONTH = `${PRE_FIX}CANDYMONTH`;
export const CANDYWARN = `${PRE_FIX}CANDYWARN`;
export const CANDYMUST = `${PRE_FIX}CANDYMUST`;

export const getCandyList = createAction(CANDYLIST, query => {
	return http.get({
		url: `candy_bow${query}`
	});
});
export const getCandyBow = createAction(CANDYBOW, query => {
	return http.get({
		url: `candy_bow/${query.id}`
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
				res.data.list.data &&
				res.data.list.data.length > 0
			) {
				let arr = [];
				res.data.list.data.map((item, index) => {
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
export const getCandyMust = createAction(CANDYMUST, () => {
	return http
		.get({
			url: "candy_bow?is_scroll"
		})
		.then(res => {
			console.log(res);
			return res;
		});
});
