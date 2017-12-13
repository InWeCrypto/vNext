import { ICOLIST } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";

const icoList = data => {
	return {
		type: ICOLIST,
		data
	};
};
const getIcoListAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}//article/ico`).then(res => {
			if (res.code === 4000) {
				dispatch(icoList(res.data));
				resolve(res.data);
			} else {
				throw new Error(res.msg);
			}
		});
	});
};
export { getIcoListAction };
