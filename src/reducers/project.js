import { PROJECTDETAIL, MARKETDATA } from "../actionTypes/";

const initState = {
	projectDetail: null,
	marketData: null
};

const projectData = (state = initState, action) => {
	switch (action.type) {
		case PROJECTDETAIL:
			return { ...state, projectDetail: action.data };
		case MARKETDATA:
			return {
				...state,
				marketData: {
					[action.data.type]: action.data.data,
					...state.marketData
				}
			};

		default:
			return state;
	}
};
export { projectData };
