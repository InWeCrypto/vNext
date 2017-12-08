import { PROJECTDETAIL, MARKETDATA } from "../actionTypes/";
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

const marketData = data => {
	return {
		type: MARKETDATA,
		data: {
			type: data.type,
			data: data.data
		}
	};
};

const getMarketDataAction = dispatch => data => {
	getData(`${requestUrl}/${data.url}`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(
					marketData({
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

export { getProjectDetailAction, getMarketDataAction };
