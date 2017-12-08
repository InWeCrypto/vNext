import { PROJECTDETAIL, MARKETDATA, TIMEPRICEDATA } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";
const projectDetail = data => {
	return {
		type: PROJECTDETAIL,
		data
	};
};
const getProjectDetailAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/project/${data.id}`).then(res => {
			if (res.code === 4000) {
				dispatch(projectDetail(res.data));
				resolve(res.data);
			} else {
				throw new Error(res.msg);
			}
		});
	});
};

const timePrice = data => {
	return {
		type: TIMEPRICEDATA,
		data: {
			type: data.type,
			data: data.data
		}
	};
};
const getTimePriceAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(
					timePrice({
						type: data.type,
						data: res.data
					})
				);
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};

export { getProjectDetailAction, getTimePriceAction };
