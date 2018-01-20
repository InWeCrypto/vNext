import { handleActions } from "redux-actions";
import { PROJECTDETAIL } from "./actions";

export const projectDetail = handleActions(
	{
		[PROJECTDETAIL]: (state, { payload }) => payload
	},
	[]
);
