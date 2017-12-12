import { CANDYBOWLBYMONTH } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";

const candyBowlByMonth = data => {
	return {
		type: CANDYBOWLBYMONTH,
		data
	};
};
const getCandyBowlByMonthAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/home/candy_bow/${data.year}/${data.month}`).then(
			res => {
				if (res.code === 4000) {
					dispatch(candyBowlByMonth(res.data));
					resolve(res.data);
				} else {
					throw new Error(res.msg);
				}
			}
		);
	});
};

export { getCandyBowlByMonthAction };
