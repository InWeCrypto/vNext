import { ICODETAIL } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";
const icoDetail = data => {
	return {
		type: ICODETAIL,
		data
	};
};
const getIcoDetailAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/article/ico/${data.id}`).then(res => {
			if (res.code === 4000) {
				dispatch(icoDetail(res.data));
				resolve(res.data);
			} else {
				throw new Error(res.msg);
			}
		});
	});
};
export { getIcoDetailAction };
