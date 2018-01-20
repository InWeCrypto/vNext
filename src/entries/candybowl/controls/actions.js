import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "CANDYBOWL_";
export const CANDYLIST = `${PRE_FIX}CANDAYLIST`;
export const CANDYMONTH = `${PRE_FIX}CANDYMONTH`;

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
