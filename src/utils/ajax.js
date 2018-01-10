import "whatwg-fetch";
import { requestUrl } from "../config/";
// import { notification } from "antd";
const METHODS = ["get", "delete"];
const BODY_METHODS = ["post", "put", "patch"];

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	} else {
		var error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

function parseJSON(response) {
	return response.json();
}

function checkRight(response) {
	if (response.code === 4000) {
		return response;
	} else {
		// notification.warn({
		// 	duration: 2,
		// 	placement: "bottomLeft",
		// 	message: "警告",
		// 	description: response.msg
		// });
		return {
			msg: response.msg,
			data: null,
			code: response.code
		};
	}
}

function request(method, url, params = {}, header = {}) {
	const headers = {
		"Content-Type": "application/json",
		//"Cache-Control": "no-cache",
		...header
	};
	let _url = requestUrl + url;
	let body;

	if (METHODS.includes(method)) {
		const _params = [];

		for (let key in params) {
			_params.push(`${key}=${params[key]}`);
		}

		if (_params.length) {
			_url += "?";
			_url += _params.join("&");
		}
	} else {
		body = JSON.stringify(params);
	}
	return fetch(_url, {
		method,
		body,
		headers
	})
		.then(checkStatus)
		.then(parseJSON)
		.then(checkRight);
}

const methods = {};

[...METHODS, ...BODY_METHODS].forEach(method => {
	methods[method] = ({ url, params, header }) =>
		request(method, url, params, header);
});

export default methods;
