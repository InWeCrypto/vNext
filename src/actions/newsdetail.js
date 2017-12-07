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
	getData(`${requestUrl}/article/${data.id}`).then(res => {
		if (res.code === 4000) {
			dispatch(newsDetail(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};
const newNews = data => {
	return {
		type: NEWNEWSLIST,
		data
	};
};

const getNewNewsListAction = dispatch => data => {
	getData(`${requestUrl}/article/all`).then(res => {
		console.log(res);
		if (res.code === 4000) {
			let r = res.data;
			let a = [];
			r.map((item, index) => {
				if (index >= 3) {
					return;
				}
				a.push(item);
			});
			dispatch(newNews(a));
		} else {
			throw new Error(res.msg);
		}
	});
};

export { getNewsDetailAction, getNewNewsListAction };
