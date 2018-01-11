import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./entries/home";
import Project from "./entries/project";
import ProjectList from "./entries/projectlist";
import ProjectOpen from "./entries/projectopen";
import News from "./entries/news";
<<<<<<< HEAD
import NewsDetail from "./entries/newsdetail";

=======
import Member from "./entries/member";
>>>>>>> a09506a10de971da47e7a0e2693598da05d1bfd1
export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={ProjectList} />
			<Route path="/projectopen" component={ProjectOpen} />
			<Route path="/news" component={News} />
<<<<<<< HEAD
			<Route path="/newsdetail" component={NewsDetail} />
=======
			<Route path="/member" component={Member} />
>>>>>>> a09506a10de971da47e7a0e2693598da05d1bfd1
		</Switch>
	);
};
