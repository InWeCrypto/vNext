import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "./entries/home";
import Project from "./entries/project";
import ProjectList from "./entries/projectlist";
import ProjectOpen from "./entries/projectopen";
import ProjectDetail from "./entries/projectdetail";
import News from "./entries/news";
import NewsText from "./entries/newslisttext";
import NewsImg from "./entries/newslistimg";
import NewsDetail from "./entries/newsdetail";
import Trading from "./entries/trading";
import Announcment from "./entries/announcment";
import Member from "./entries/member";
import CandyBowl from "./entries/candybowl";
import Search from "./entries/search";
import Wallent from "./entries/wallent";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={ProjectList} />
			<Route path="/projectopen" component={ProjectOpen} />
			<Route path="/projectdetail" component={ProjectDetail} />
			<Route path="/news" component={News} />
			<Route path="/newslisttext" component={NewsText} />
			<Route path="/newslistimg" component={NewsImg} />
			<Route path="/newsdetail" component={NewsDetail} />
			<Route path="/trading" component={Trading} />
			<Route path="/announcment" component={Announcment} />
			<Route path="/member" component={Member} />
			<Route path="/candybowl" component={CandyBowl} />
			<Route path="/search" component={Search} />
			<Route path="/app" component={Wallent} />
		</Switch>
	);
};
