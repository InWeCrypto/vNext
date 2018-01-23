import { handleActions } from "redux-actions";
import { CANDYLIST, CANDYMONTH, CANDYWARN } from "./actions";

export const candyList = handleActions(
	{
		[CANDYLIST]: (state, { payload }) => payload,
		[CANDYWARN]: (state, { payload }) => {
			return { ...state, candy_bow_user: payload };
		}
	},
	[]
);
export const candyMonth = handleActions(
	{
		[CANDYMONTH]: (state, { payload }) => payload
	},
	null
);
