import { handleActions } from "redux-actions";
import {
	ARTICLELIST,
	NEWSLIST,
	CANDYLIST,
	ADS,
	EXCHANGENOTICE,
	USERFAVO
} from "./actions";

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
export const ads = handleActions(
	{
		[ADS]: (state, { payload }) => payload
	},
	[]
);
export const exchangeNotice = handleActions(
	{
		[EXCHANGENOTICE]: (state, { payload }) => payload
	},
	[]
);
export const userFavo = handleActions(
	{
		[USERFAVO]: (state, { payload }) => payload
	},
	[]
);
