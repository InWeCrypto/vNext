import { createAction } from "redux-actions";
import http from "./utils/ajax";
export const LNG = "LNG";
export const USERINFO = "USERINFO";
export const EMAILCODE = "EMAILCODE";
export const changeLng = createAction(LNG, lng => {
	return lng;
});
export const sendEmailCode = createAction(EMAILCODE, email => {
	return http.post({
		url: `send_code/${email}`
	});
});
