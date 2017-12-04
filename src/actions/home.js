import { INFOLIST, PROJECTLIST } from "../actionTypes/";
import { getData } from "../lib/js/app";
import { requstUrl } from "../config/";
const infoList = data => {
	return {
		type: INFOLIST,
		data
	};
};
const getInfoListAction = dispatch => data => {
	getData(`${requstUrl}/article/all`).then(res => {
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
	getData(`${requstUrl}/home/project`).then(res => {
		if (res.code === 4000) {
			dispatch(projectList(res.data));
		} else {
			throw new Error(res.msg);
		}
	});
};

export { getInfoListAction, getProjectListAction };
