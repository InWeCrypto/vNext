import { NEWSDETAIL, NEWNEWSLIST } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requestUrl } from "../config/";

const newsDetail = data => {
	return {
		type: NEWSDETAIL,
		data
	};
};
const getNewsDetailAction = dispatch => data => {
	return new Promise((resolve, reject) => {
		getData(`${requestUrl}/article/${data.id}`).then(res => {
			if (res.code === 4000) {
				dispatch(newsDetail(res.data));
				resolve(res.data);
			} else {
				reject(res.msg);
				throw new Error(res.msg);
			}
		});
	});
};
const newNews = data => {
	return {
		type: NEWNEWSLIST,
		data
	};
};

const getNewNewsListAction = dispatch => data => {
	getData(`${requestUrl}/category/${data.id}/articles/all`).then(res => {
		if (res.code === 4000) {
			let arr = res.data;
			let r = arr.filter(item => {
				if (item.id !== data.ownId) {
					return item;
				}
			});
			dispatch(newNews(r));
		} else {
			throw new Error(res.msg);
		}
	});
};

export { getNewsDetailAction, getNewNewsListAction };
