import { handleActions } from "redux-actions";
import {
	COLLECTION,
	QUOTATION,
	UPLOADKEY,
	SETPROJECTCOLLETION,
	NEWSLIST,
	PROJECTFOLLOW
} from "./actions";

export const collectionList = handleActions(
	{
		[COLLECTION]: (state, { payload }) => payload,
		[SETPROJECTCOLLETION]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});
			return { ...state, data: data };
		}
	},
	null
);
export const quotationList = handleActions(
	{
		[QUOTATION]: (state, { payload }) => payload,
		[PROJECTFOLLOW]: (state, { payload }) => {
			let d = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: d };
		}
	},
	null
);
export const uploadKey = handleActions(
	{
		[UPLOADKEY]: (state, { payload }) => payload
	},
	null
);
export const memberNewsList = handleActions(
	{
		[NEWSLIST]: (state, { payload }) => payload
	},
	null
);
