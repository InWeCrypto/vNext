import { NEWSDETAIL, NEWNEWSLIST } from "../actionTypes/";

const initState = {
	newsDetail: null,
	newNewsList: null
};

const newsDetailData = (state = initState, action) => {
	switch (action.type) {
		case NEWSDETAIL:
			return { ...state, newsDetail: action.data };
		case NEWNEWSLIST:
			return { ...state, newNewsList: action.data };
		default:
			return state;
	}
};
export { newsDetailData };
