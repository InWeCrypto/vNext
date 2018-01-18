import { handleActions } from "redux-actions";
import { NEWSDETAIL } from "./actions";

export const newsDetail = handleActions(
	{
		[NEWSDETAIL]: (state, { payload }) => payload
	},
	[]
);
