import { CANDYBOWLBYMONTH, MUSTREAD } from "../actionTypes/";
const initState = {
	candyBowlByMonth: null,
	mustRead: null
};

const candayBowlData = (state = initState, action) => {
	switch (action.type) {
		case CANDYBOWLBYMONTH:
			return { ...state, candyBowlByMonth: action.data };
		case MUSTREAD:
			return { ...state, mustRead: action.data };
		default:
			return state;
	}
};

export { candayBowlData };
