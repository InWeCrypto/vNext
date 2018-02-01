import { handleActions } from "redux-actions";
import {
	PROJECTDETAIL,
	COINTIMEPRICE,
	PROJECTREMIND,
	PROJECTCOLLECT,
	PROJECTDYNAMIC,
	PROJECTDYNAMICLIST,
	DYNAMICSCROLLLIST,
	PROJECTSCORE,
	PROJECTDOT,
	PROJECTKCHARTS,
	MARKETS
} from "./actions";

export const projectDetail = handleActions(
	{
		[PROJECTDETAIL]: (state, { payload }) => payload,
		[PROJECTREMIND]: (state, { payload }) => {
			return { ...state, category_user: payload };
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			return { ...state, category_user: payload };
		},
		[PROJECTSCORE]: (state, { payload }) => {
			return { ...state, category_user: payload };
		}
	},
	[]
);
export const coinTimePrice = handleActions(
	{
		[COINTIMEPRICE]: (state, { payload }) => payload
	},
	[]
);
export const projectDynamic = handleActions(
	{
		[PROJECTDYNAMIC]: (state, { payload }) => payload
	},
	[]
);
export const projectDynamicList = handleActions(
	{
		[PROJECTDYNAMICLIST]: (state, { payload }) => payload,
		[DYNAMICSCROLLLIST]: (state, { payload }) => {
			state.data = state.data.concat(payload.data);
			return state;
		}
	},
	[]
);
export const projectDot = handleActions(
	{
		[PROJECTDOT]: (state, { payload }) => payload
	},
	[]
);
export const projectKdata = handleActions(
	{
		[PROJECTKCHARTS]: (state, { payload }) => payload
	},
	null
);
export const markets = handleActions(
	{
		[MARKETS]: (state, { payload }) => payload
	},
	null
);
