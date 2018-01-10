import React, { PureComponent } from "react";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import TopText from "../toptext/";
import "./index.less";
export default class Root extends PureComponent {
	componentDidMount() {
		document.title = "InWe-首页";
		this.props.getNewsList();
		let minH = getMainMinHeight();
		this.refs.mainBox.style.minHeight = minH + "px";
		window.onresize;
	}
	render() {
		return (
			<div className="container">
				<Header />
				<div ref="mainBox" className="main">
					<div className="top-text">
						<TopText />
					</div>
					<div className="left-menu">22</div>
				</div>
				<Footer />
			</div>
		);
	}
}
