import { PROJECTDETAIL, TIMEPRICEDATA } from "../actionTypes/";

const initState = {
	projectDetail: null,
	timePrice: null
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

		default:
			return state;
	}
};
export { projectData };
