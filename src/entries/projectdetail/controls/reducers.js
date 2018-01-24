import { handleActions } from "redux-actions";
import {
	PROJECTDETAIL,
	COINTIMEPRICE,
	PROJECTREMIND,
	PROJECTCOLLECT
} from "./actions";

export const projectDetail = handleActions(
	{
		[PROJECTDETAIL]: (state, { payload }) => payload,
		[PROJECTREMIND]: (state, { payload }) => {
			return { ...state, category_user: payload };
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			return { ...state, category_user: payload };
		}
	},
	[]
);
export const coinTimePrice = handleActions(
	{
		[COINTIMEPRICE]: (state, { payload }) => payload
	},
	[]
);
