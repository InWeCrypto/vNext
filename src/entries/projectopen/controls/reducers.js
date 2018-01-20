import { handleActions } from "redux-actions";
import { PROJECT, PROJECTCOLLECT } from "./actions";

export const project = handleActions(
	{
		[PROJECT]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			state.data.map((item, index) => {
				if (item.id === payload.id) {
				}
			});
			return payload;
		}
	},
	[]
);
