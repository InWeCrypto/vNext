import { handleActions } from "redux-actions";
import {
	ARTICLELIST,
	NEWSLIST,
	PROJECT,
	CANDYLIST,
	ADS,
	ADS2,
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
export const project = handleActions(
	{
		[PROJECT]: (state, { payload }) => {
			return payload;
		}
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
export const ads2 = handleActions(
	{
		[ADS2]: (state, { payload }) => payload
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
