import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import TopText from "../toptext/";
import { getQuery } from "../../../../utils/util";
import "./index.less";
export default class Root extends PureComponent {
	constructor(props) {
		super();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
		}
	}
	componentDidMount() {
		document.title = "InWe-首页";
		this.props.getNewsList();
		let minH = getMainMinHeight();
		let th = document.querySelector("#topText").clientHeight;
		document.querySelector("#mainBox").style.minHeight = minH - th + "px";
	}
	componentDidUpdate() {}
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						{/* <FixedMenu changeLng={changeLng} lng={lng} /> */}
						<Header />
						<div id="topText" className="top-text">
							<TopText lng={lng} />
						</div>
						<div id="mainBox" className="main">
							<div className="left-menus ui center">
								<div className="left-menu-home">
									<LeftMenu lng={lng} />
								</div>
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
