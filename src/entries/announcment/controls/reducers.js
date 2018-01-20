import { handleActions } from "redux-actions";
import { ANNOUNCMENT } from "./actions";

export const announcmentList = handleActions(
	{
		[ANNOUNCMENT]: (state, { payload }) => payload
	},
	[]
);
