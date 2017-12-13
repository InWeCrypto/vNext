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

const initState = {
	projectDetail: null,
	timePrice: null,
	kData: null,
	kType: 1,
	marketData: null,
	videoList: null,
	imgTxtList: null,
	inewsIndex: 0,
	newsFlash: null
};

const projectData = (state = initState, action) => {
	switch (action.type) {
		case PROJECTDETAIL:
			return { ...state, projectDetail: action.data };
		case TIMEPRICEDATA:
			return {
				...state,
				timePrice: {
					[action.data.type]: action.data.data,
					...state.timePrice
				}
			};
		case KDATA:
			return { ...state, kData: action.data };
		case KTYPE:
			return { ...state, kType: action.data };
		case MARKETDATA:
			return { ...state, marketData: action.data };
		case INEWSINDEX:
			return { ...state, inewsIndex: action.data };
		case VIDEOLIST:
			return { ...state, videoList: action.data };
		case IMGTXTLIST:
			return { ...state, imgTxtList: action.data };
		case NEWSFLASH:
			return { ...state, newsFlash: action.data };
		case RESETPROJECT:
			return { ...initState };
		default:
			return state;
	}
};
export { projectData };
