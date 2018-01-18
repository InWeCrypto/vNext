import { handleActions } from "redux-actions";
import { COLLECTION } from "./actions";

export const collectionList = handleActions(
	{
		[COLLECTION]: (state, { payload }) => payload
	},
	null
);
