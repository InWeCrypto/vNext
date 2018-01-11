import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-Trading";
		this.props.getNews();
		let minH = getMainMinHeight();
		let liW =
			(document.querySelector("#projectContentRef").clientWidth - 187) /
			2;
		this.setState({
			minH: minH,
			liW: liW
		});
		document.querySelector("#mainBox").style.height = minH + "px";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			showArrow: "right",
			liW: "auto",
			leftTwoMenuCur: ""
		};
	}
	render() {
		const { minH, liW } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header />
						<div id="mainBox" className="new ui">
							<div className="left-menus ui center">
								<LeftMenu lng={lng} />
							</div>
							<div
								id="projectContentRef"
								className="projectContent ui f1"
							>
								1214
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
