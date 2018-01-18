import { handleActions } from "redux-actions";
import { LNG, EMAILCODE, USERINFO } from "./globalactions";
export const lng = handleActions(
	{
		[LNG]: (state, { payload }) => {
			return payload;
		}
	},
	"cn"
);
export const userInfo = handleActions(
	{
		USERINFO: (state, { payload }) => {
			console.log(payload);
			return payload;
		}
	},
	null
);
export const emailCode = handleActions(
	{
		EMAILCODE: (state, { payload }) => payload
	},
	null
);
