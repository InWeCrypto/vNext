import { handleActions } from "redux-actions";
import { TRADING, TRADINGM } from "./actions";

export const trading = handleActions(
	{
		[TRADING]: (state, { payload }) => payload,
		[TRADINGM]: (state, { payload }) => {
			if (payload.data.length >= 10) {
				window.TradingAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
