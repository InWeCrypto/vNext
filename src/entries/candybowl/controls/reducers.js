import { handleActions } from "redux-actions";
import { CANDAYLIST } from "./actions";

export const candyList = handleActions(
	{
		[CANDAYLIST]: (state, { payload }) => payload
	},
	[]
);
