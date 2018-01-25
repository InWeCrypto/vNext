import React from "react";
import createHistory from "history/createBrowserHistory";

import { I18nextProvider } from "react-i18next";
import storeFun from "./store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { render as domRender } from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "./assets/less/app.less";
import i18n from "./i18n";
import { changeLng, setReduxUserInfo } from "./globalactions";
import { getLocalItem, remFun, addClass } from "./utils/util";
remFun();
if (IsTouchDevice) {
	let body = document.getElementsByTagName("body")[0];
	addClass(body, "mobile");
}
const history = createHistory();
const store = storeFun(history);
window.history = history;
window.i18n = i18n;
let userinfo = getLocalItem("userInfo");
window.store = store;
store.dispatch(changeLng(window.i18n.language));
if (userinfo && userinfo.data) {
	store.dispatch(setReduxUserInfo(JSON.parse(userinfo.data)));
}
const render = Component => {
	domRender(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<Component />
			</ConnectedRouter>
		</Provider>,
		document.getElementById("root")
	);
};

render(Routes);

registerServiceWorker();
