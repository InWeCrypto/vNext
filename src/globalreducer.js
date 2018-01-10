import { handleActions } from "redux-actions";
import { LNG } from "./globalactions";
export const lng = handleActions(
	{
		[LNG]: (state, { payload }) => {
			return payload;
		}
	},
	"cn"
);
