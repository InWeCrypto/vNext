import { handleActions } from "redux-actions";
import { NEWSTEXT, NEWSIMG, NEWSVIDEO } from "./actions";

export const newsText = handleActions(
	{
		[NEWSTEXT]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
export const newsImg = handleActions(
	{
		[NEWSIMG]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
export const newsVideo = handleActions(
	{
		[NEWSVIDEO]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
