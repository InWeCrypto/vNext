import { createAction } from "redux-actions";
import http from "./utils/ajax";
export const LNG = "LNG";
export const USERINFO = "USERINFO";
export const EMAILCODE = "EMAILCODE";
export const changeLng = createAction(LNG, lng => {
	return lng;
});
export const sendEmailCode = createAction(EMAILCODE, email => {
	return http
		.post({
			url: `send_code/${email}`
		})
		.then(res => {
			if (res.code === 4000) {
				Msg.prompt("send success");
			} else {
				Msg.alert("send fail");
			}
			return res;
		});
});
export const registerUser = createAction(USERINFO, params => {
	return http
		.post({
			url: "register",
			params: params
		})
		.then(res => {
			console.log(res);
			return res;
		});
});
export const loginIn = createAction(USERINFO, params => {
	return http
		.post({
			url: "login",
			params: params
		})
		.then(res => {
			console.log(res);
			return res;
		});
});
