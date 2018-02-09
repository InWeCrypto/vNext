import { handleActions } from "redux-actions";
import { SEARCH, SEARCHPRO } from "./actions";

export const search = handleActions(
	{
		[SEARCH]: (state, { payload }) => payload
	},
	[]
);
export const searchPro = handleActions(
	{
		[SEARCHPRO]: (state, { payload }) => payload
	},
	[]
);
