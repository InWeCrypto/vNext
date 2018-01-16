import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./entries/home";
import Project from "./entries/project";
import ProjectList from "./entries/projectlist";
import ProjectOpen from "./entries/projectopen";
import ProjectDetailIco from "./entries/projectdetailico";
import News from "./entries/news";
import NewsDetail from "./entries/newsdetail";
import Trading from "./entries/trading";
import Announcment from "./entries/announcment";
import Member from "./entries/member";
import CandyBowl from "./entries/candybowl";

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={Home} />
			<Route path="/project" component={Project} />
			<Route path="/projectlist" component={ProjectList} />
			<Route path="/projectopen" component={ProjectOpen} />
			<Route path="/projectdetailico" component={ProjectDetailIco} />
			<Route path="/news" component={News} />
			<Route path="/newsdetail" component={NewsDetail} />
			<Route path="/trading" component={Trading} />
			<Route path="/announcment" component={Announcment} />
			<Route path="/member" component={Member} />
			<Route path="/candybowl" component={CandyBowl} />
		</Switch>
	);
};
