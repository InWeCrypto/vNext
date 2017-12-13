import { CANDYBOWLBYMONTH } from "../actionTypes/";
const initState = {
	candyBowlByMonth: null
};

const candayBowlData = (state = initState, action) => {
	switch (action.type) {
		case CANDYBOWLBYMONTH:
			return { ...state, candyBowlByMonth: action.data };
		default:
			return state;
	}
};

export { candayBowlData };
