import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import GaiKuo from "../../../../components/gaikuo";
import ProjectDetailIco from "../projectdetailico";
import ProjectDetailInfo from "../projectdetailinfo";
import ProjectDetailIntro from "../projectdetailintro";
import ProjectDetailGaiKuo from "../projectdetailgaikuo";
import ProjectDetailChat from "../projectdetailchat";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cur: "",
			minH: "auto",
			ico: false,
			gaikuo: false,
			info: false,
			intro: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-ICO";
		this.props.getProjectDetail();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(location) {
		let p = getQuery(location);
		if (
			p.type &&
			["ico", "gaikuo", "info", "intro"].indexOf(p.type) != -1
		) {
			this.setShowItem(p.type);
		}
	}
	setShowItem(type) {
		let set = {};
		set[type] = true;
		set["cur"] = type;
		this.setState(set);
	}
	componentDidUpdate() {}
	render() {
		const { minH, ico, gaikuo, info, intro } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="projectDetail ui">
							{ico && <ProjectDetailIco lng={lng} />}
							{gaikuo && <ProjectDetailGaiKuo lng={lng} />}
							{info && <ProjectDetailInfo lng={lng} />}
							{intro && <ProjectDetailIntro lng={lng} />}
							<div className="projectDetailCon3">
								<ul className="projectDetailCon3Ul">
									<li className={ico || gaikuo ? "cur" : ""}>
										<span>项目概况</span>
									</li>
									<li className={info ? "cur" : ""}>
										<span>项目资讯</span>
									</li>
									<li className={intro ? "cur" : ""}>
										<span>项目介绍</span>
									</li>
								</ul>
								<ProjectDetailChat lng={lng} />
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
