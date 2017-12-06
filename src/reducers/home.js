import {
	INFOLIST,
	PROJECTLIST,
	NEWSLIST,
	BANNERLIST,
	PROJECTSTATE,
	CANDYDATA
} from "../actionTypes/";
const homeData = {
	infoList: null,
	projectList: null,
	newsList: null,
	bannerList: null,
	showMoreProject: false,
	candyData: null
};

const homeInfo = (state = homeData, action) => {
	switch (action.type) {
		case INFOLIST:
			return { ...state, infoList: action.data };
		case PROJECTLIST:
			return { ...state, projectList: action.data };
		case NEWSLIST:
			return { ...state, newsList: action.data };
		case BANNERLIST:
			return { ...state, bannerList: action.data };
		case PROJECTSTATE:
			return { ...state, showMoreProject: action.data };
		case CANDYDATA:
			return { ...state, candyData: action.data };
		default:
			return state;
	}
};
export { homeInfo };
