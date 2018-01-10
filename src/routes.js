import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./entries/home";
import Project from "./entries/project";
import ProjectList from "./entries/projectlist";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={ProjectList} />
		</Switch>
	);
};
