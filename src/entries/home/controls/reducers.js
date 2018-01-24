import { handleActions } from "redux-actions";
import { ARTICLELIST, NEWSLIST } from "./actions";

export const articleList = handleActions(
	{
		[ARTICLELIST]: (state, { payload }) => payload
	},
	[]
);
export const newsList = handleActions(
	{
		[NEWSLIST]: (state, { payload }) => payload
	},
	[]
);
