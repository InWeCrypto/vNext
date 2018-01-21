import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "TRADING_";
export const TRADING = `${PRE_FIX}TRADING`;

export const getTrading = createAction(TRADING, params => {
	return http.get({
		url: "ads",
		params: params
	});
});
