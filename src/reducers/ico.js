import { ICOLIST } from "../actionTypes/";
const initState = {
	icoList: null
};

const icoData = (state = initState, action) => {
	switch (action.type) {
		case ICOLIST:
			return { ...state, icoList: action.data };
		default:
			return state;
	}
};

export { icoData };
