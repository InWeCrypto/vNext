import { handleActions } from "redux-actions";
import { WALLENT } from "./actions";

export const wallent = handleActions(
	{
		[WALLENT]: (state, { payload }) => payload
	},
	[]
);
