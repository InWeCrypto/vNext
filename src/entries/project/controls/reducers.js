import { handleActions } from "redux-actions";
import { PROJECT, PROJECTCOLLECT } from "./actions";

export const project = handleActions(
	{
		[PROJECT]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: data };
		}
	},
	[]
);
