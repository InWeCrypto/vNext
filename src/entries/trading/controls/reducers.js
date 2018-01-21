import { handleActions } from "redux-actions";
import { TRADING } from "./actions";

export const trading = handleActions(
	{
		[TRADING]: (state, { payload }) => payload
	},
	[]
);
