import { handleActions } from "redux-actions";
import { CANDYLIST, CANDYMONTH } from "./actions";

export const candyList = handleActions(
	{
		[CANDYLIST]: (state, { payload }) => payload
	},
	[]
);
export const candyMonth = handleActions(
	{
		[CANDYMONTH]: (state, { payload }) => payload
	},
	null
);
