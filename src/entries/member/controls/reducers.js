import { handleActions } from "redux-actions";
import {
	COLLECTION,
	QUOTATION,
	UPLOADKEY,
	SETPROJECTCOLLETION
} from "./actions";

export const collectionList = handleActions(
	{
		[COLLECTION]: (state, { payload }) => payload,
		[SETPROJECTCOLLETION]: (state, { payload }) => {
			return payload;
		}
	},
	null
);
export const quotationList = handleActions(
	{
		[QUOTATION]: (state, { payload }) => payload
	},
	null
);
export const uploadKey = handleActions(
	{
		[UPLOADKEY]: (state, { payload }) => payload
	},
	null
);
