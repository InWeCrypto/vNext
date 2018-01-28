import { handleActions } from "redux-actions";
import {
	NEWSDETAIL,
	NEWSDETAILCOLLECT,
	NEWSDETAILCOMMENT,
	NEWSDETAILCOMMENTL
} from "./actions";

export const newsDetail = handleActions(
	{
		[NEWSDETAIL]: (state, { payload }) => payload
	},
	[]
);
export const newsDetailCollect = handleActions(
	{
		[NEWSDETAILCOLLECT]: (state, { payload }) => payload
	},
	[]
);
export const newsDetailComment = handleActions(
	{
		[NEWSDETAILCOMMENT]: (state, { payload }) => payload
	},
	[]
);
export const newsDetailCommentL = handleActions(
	{
		[NEWSDETAILCOMMENTL]: (state, { payload }) => payload
	},
	[]
);
