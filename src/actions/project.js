import {
	PROJECTDETAIL,
	TIMEPRICEDATA,
	KDATA,
	KTYPE,
	MARKETDATA,
	INEWSINDEX,
	VIDEOLIST,
	IMGTXTLIST,
	NEWSFLASH,
	RESETPROJECT
} from "../actionTypes/";
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
				dispatch(kData(null));
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const kData = data => {
	return {
		type: KDATA,
		data
	};
};
const getKDataAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/${data.url}/${data.type}/10`).then(res => {
			if (res.code === 4000) {
				dispatch(kData(res.data));
				resolve(res.data);
			} else {
				throw new Error(res.msg);
			}
		});
	});
};
const kType = data => {
	return {
		type: KTYPE,
		data
	};
};
const changeKTypeAction = dispatch => data => {
	dispatch(kType(data));
};
const marketData = data => {
	return {
		type: MARKETDATA,
		data
	};
};
const getMarketDataAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/${data.url}`).then(res => {
			console.log(res);
			if (res.code === 4000) {
				dispatch(marketData(res.data));
			} else {
				throw new Error(res.msg);
			}
		});
	});
};
const inewsIndex = data => {
	return {
		type: INEWSINDEX,
		data
	};
};
const changeInewsIndex = dispatch => data => {
	dispatch(inewsIndex(data));
};
const videoList = data => {
	return {
		type: VIDEOLIST,
		data
	};
};
const getVideoListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/video`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(videoList(res.data));
				if (!res.data || res.data.length == 0) {
					dispatch(inewsIndex(1));
				}
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const imgTxtList = data => {
	return {
		type: IMGTXTLIST,
		data
	};
};
const getImgTxtListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/img-txt`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(imgTxtList(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};

const newsList = data => {
	return {
		type: NEWSFLASH,
		data
	};
};
const getProjectNewsListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/txt/all`).then(res => {
		if (res.code === 4000) {
			dispatch(newsList(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};
const resetProject = data => {
	return {
		type: RESETPROJECT,
		data
	};
};
const resetProjectAction = dispatch => data => {
	dispatch(resetProject());
};
export {
	getProjectDetailAction,
	getTimePriceAction,
	getKDataAction,
	changeKTypeAction,
	getMarketDataAction,
	changeInewsIndex,
	getVideoListAction,
	getImgTxtListAction,
	getProjectNewsListAction,
	resetProjectAction
};
