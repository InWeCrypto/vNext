import { handleActions } from "redux-actions";
import { ARTICLELIST, NEWSLIST, CANDYLIST } from "./actions";

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
export const candyList = handleActions(
	{
		[CANDYLIST]: (state, { payload }) => payload
	},
	[]
);
