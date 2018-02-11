import { handleActions } from "redux-actions";
import {
	CANDYLIST,
	CANDYBOW,
	CANDYMONTH,
	CANDYWARN,
	CANDYMUST
} from "./actions";

export const candyList = handleActions(
	{
		[CANDYLIST]: (state, { payload }) => payload,
		[CANDYWARN]: (state, { payload }) => {
			return { ...state, candy_bow_user: payload };
		}
	},
	[]
);
export const candybow = handleActions(
	{
		[CANDYBOW]: (state, { payload }) => payload
	},
	[]
);
export const candyMonth = handleActions(
	{
		[CANDYMONTH]: (state, { payload }) => payload
	},
	null
);
export const candyMustList = handleActions(
	{
		[CANDYMUST]: (state, { payload }) => payload
	},
	null
);
