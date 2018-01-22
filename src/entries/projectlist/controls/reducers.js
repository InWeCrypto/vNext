import { handleActions } from "redux-actions";
import {
	PROJECT,
	PROJECT2,
	PROJECT3,
	PROJECT4,
	PROJECTCOLLECT
} from "./actions";

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
export const project2 = handleActions(
	{
		[PROJECT2]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
export const project3 = handleActions(
	{
		[PROJECT3]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
export const project4 = handleActions(
	{
		[PROJECT4]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
