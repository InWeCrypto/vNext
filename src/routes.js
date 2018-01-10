import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./entries/home";
import Project from "./entries/project";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
		</Switch>
	);
};
