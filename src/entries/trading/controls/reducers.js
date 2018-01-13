import { handleActions } from "redux-actions";
import { NEWSLIST } from "./actions";

export const tradingList = handleActions(
	{
		[NEWSLIST]: (state, { payload }) => payload
	},
	[]
);
