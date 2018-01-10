import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import TopText from "../toptext/";
import "./index.less";
export default class Root extends PureComponent {
	constructor(props) {
		super();
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-首页";
		this.props.getNewsList();
		let minH = getMainMinHeight();
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	componentDidUpdate() {}
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="main">
							<div className="top-text">
								<TopText lng={lng} />
							</div>

							<div className="left-menu">
								<LeftMenu lng={lng} />
								{i18n.t("name", { lng })}
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
