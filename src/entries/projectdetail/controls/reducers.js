import { handleActions } from "redux-actions";
import { NEWSLIST } from "./actions";

export const newsList = handleActions(
	{
		[NEWSLIST]: (state, { payload }) => payload
	},
	[]
);
