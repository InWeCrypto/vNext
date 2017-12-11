import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Link, Switch, Route } from "react-router-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";

import reducers from "../reducers/";
import actions from "../actions/";
import Home from "./home/";
import NewsDetail from "./news-detail/";
import Header from "./components/header/";
import Project from "./project/";
import Ico from "./ico/";
import IcoDetail from "./ico-detail/";
import "../lib/css/app.less";
let store;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
	store = createStore(
		reducers,
		compose(
			applyMiddleware(thunk),
			window.__REDUX_DEVTOOLS_EXTENSION__
				? window.__REDUX_DEVTOOLS_EXTENSION__()
				: () => {}
		)
	);
} else {
	store = createStore(reducers, applyMiddleware(thunk));
}

export default class AppComponent extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<Header />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/news-detail" component={NewsDetail} />
							<Route path="/project" component={Project} />
							<Route path="/ico" component={Ico} />
							<Route path="/ico-detail" component={IcoDetail} />
						</Switch>
					</div>
				</Router>
			</Provider>
		);
	}
}
ReactDOM.render(<AppComponent />, document.getElementById("root"));
