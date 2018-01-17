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
import { changeLng } from "./globalactions";
const history = createHistory();
const store = storeFun(history);

window.i18n = i18n;
store.dispatch(changeLng(window.i18n.language));

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
