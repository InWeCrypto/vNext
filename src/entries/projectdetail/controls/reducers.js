import { handleActions } from "redux-actions";
import {
	PROJECTDETAIL,
	COINTIMEPRICE,
	PROJECTREMIND,
	PROJECTCOLLECT,
	PROJECTDYNAMIC,
	PROJECTDYNAMICLIST,
	PROJECTSCORE,
	PROJECTDOT
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
		[PROJECTDYNAMICLIST]: (state, { payload }) => payload
	},
	[]
);
export const projectDot = handleActions(
	{
		[PROJECTDOT]: (state, { payload }) => payload
	},
	[]
);
