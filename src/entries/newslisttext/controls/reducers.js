import { handleActions } from "redux-actions";
import { NEWSTEXTL } from "./actions";

export const newslisttext = handleActions(
	{
		[NEWSTEXTL]: (state, { payload }) => payload
	},
	[]
);
