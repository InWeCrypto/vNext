import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-News";
		this.props.getNewsDetail();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	componentDidUpdate() {}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="projectOpen ui">
							<div className="projectOpenLeft ui center">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
							<div className="projectOpenCon ui">
								<div className="projectOpenConChild">
									<div className="projectOpenConChildTitle">
										<span className="ellitext">
											Trading
										</span>
									</div>
								</div>
							</div>
							<div className="projectOpenRight show ui center">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
