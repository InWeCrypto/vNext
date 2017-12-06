import {
	INFOLIST,
	PROJECTLIST,
	NEWSLIST,
	BANNERLIST,
	PROJECTSTATE,
	CANDYDATA
} from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";
const infoList = data => {
	return {
		type: INFOLIST,
		data
	};
};
const getInfoListAction = dispatch => data => {
	getData(`${requestUrl}/article/img-txt-video`).then(res => {
		if (res.code === 4000) {
			dispatch(infoList(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};

const projectList = data => {
	return {
		type: PROJECTLIST,
		data
	};
};
const getProjectListAction = dispatch => data => {
	getData(`${requestUrl}/home/project`).then(res => {
		if (res.code === 4000) {
			dispatch(projectList(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};

const newsList = data => {
	return {
		type: NEWSLIST,
		data
	};
};

const getNewsListAction = dispatch => data => {
	getData(`${requestUrl}/home/news`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(newsList(res.data));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};
const bannerList = data => {
	return {
		type: BANNERLIST,
		data
	};
};
const getBannerListAction = dispatch => dat => {
	getData(`${requestUrl}/home/ad`)
		.then(res => {
			if (res.code === 4000) {
				dispatch(bannerList(res.data.list));
			} else {
				throw new Error(res.msg);
			}
		})
		.catch(e => {
			console.log(e);
		});
};

const projectState = data => {
	return {
		type: PROJECTSTATE,
		data
	};
};
const changeProjectStateAction = dispatch => data => {
	dispatch(projectState(data));
};
const candyData = data => {
	return {
		type: CANDYDATA,
		data
	};
};
const getCandyDataAction = dispatch => data => {
	let query = "";
	if (data.year) {
		query = data.year;
	}
	if (data.year && data.month) {
		query += "/" + data.month;
	}
	if (data.year && data.month && data.day) {
		query += "/" + data.day;
	}
	if (query.length == 0) {
		console.log("candybox时间参数错误");
		return;
	}
	if (data.id) {
		query += `?category_id=${data.id}`;
	}
	getData(`${requestUrl}/home/candy_bow/${query}`).then(res => {
		console.log(res);
		if (res.code === 4000) {
		} else {
			throw new Error(res.msg);
		}
	});
};

export {
	getInfoListAction,
	getProjectListAction,
	getNewsListAction,
	getBannerListAction,
	changeProjectStateAction,
	getCandyDataAction
};
