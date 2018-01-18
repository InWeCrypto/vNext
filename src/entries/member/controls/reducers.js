import { handleActions } from "redux-actions";
import { COLLECTION, QUOTATION } from "./actions";

export const collectionList = handleActions(
	{
		[COLLECTION]: (state, { payload }) => payload
	},
	null
);
export const quotationList = handleActions(
	{
		[QUOTATION]: (state, { payload }) => payload
	},
	null
);
