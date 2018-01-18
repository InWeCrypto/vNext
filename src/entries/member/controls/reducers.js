import { handleActions } from "redux-actions";
import { NEWSLIST } from "./actions";

export const newsList = handleActions(
	{
		[PUSH]: (state, { payload }) => payload
	},
	[]
);
