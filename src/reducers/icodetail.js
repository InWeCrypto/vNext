import { ICODETAIL } from "../actionTypes/";

const initState = {
	icoDetail: null
};

const icoDetailData = (state = initState, action) => {
	switch (action.type) {
		case ICODETAIL:
			return { ...state, icoDetail: action.data };
		default:
			return state;
	}
};

export { icoDetailData };
