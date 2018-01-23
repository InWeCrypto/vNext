import { handleActions } from "redux-actions";
import { PROJECTDETAIL, COINTIMEPRICE } from "./actions";

export const projectDetail = handleActions(
	{
		[PROJECTDETAIL]: (state, { payload }) => payload
	},
	[]
);
export const coinTimePrice = handleActions(
	{
		[COINTIMEPRICE]: (state, { payload }) => payload
	},
	[]
);
