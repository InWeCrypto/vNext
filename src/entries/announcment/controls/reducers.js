import { handleActions } from "redux-actions";
import { ANNOUNCMENT } from "./actions";

export const announcment = handleActions(
	{
		[ANNOUNCMENT]: (state, { payload }) => payload
	},
	[]
);
