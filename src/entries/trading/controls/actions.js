import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "TRADING_";
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;

export const getTrading = createAction(NEWSLIST, () => {
	return http.post({
		url: "",
		params: {}
	});
});
