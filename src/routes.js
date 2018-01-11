import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./entries/home";
import Project from "./entries/project";
import ProjectList from "./entries/projectlist";
import ProjectOpen from "./entries/projectopen";
import News from "./entries/news";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={ProjectList} />
			<Route path="/projectopen" component={ProjectOpen} />
			<Route path="/news" component={News} />
		</Switch>
	);
};
