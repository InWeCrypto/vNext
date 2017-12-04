import { INFOLIST, PROJECTLIST } from "../actionTypes/";
const homeData = {
	infoList: null,
	projectList: null
};

const homeInfo = (state = homeData, action) => {
	switch (action.type) {
		case INFOLIST:
			return { ...state, infoList: action.data };
		case PROJECTLIST:
			return { ...state, projectList: action.data };
		default:
			return state;
	}
};
export { homeInfo };
