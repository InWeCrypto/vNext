import { handleActions } from "redux-actions";
import { NEWSLIST } from "./actions";

export const announcmentList = handleActions(
	{
		[NEWSLIST]: (state, { payload }) => payload
	},
	[]
);
