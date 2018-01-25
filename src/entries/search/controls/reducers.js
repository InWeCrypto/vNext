import { handleActions } from "redux-actions";
import { SEARCH } from "./actions";

export const search = handleActions(
	{
		[SEARCH]: (state, { payload }) => payload
	},
	[]
);
