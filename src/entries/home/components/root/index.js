import React, { PureComponent } from "react";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
export default class Root extends PureComponent {
	componentDidMount() {
		this.props.getNewsList();
		let minH = getMainMinHeight();
		this.refs.mainBox.style.minHeight = minH + "px";
	}
	render() {
		return (
			<div className="container">
				<Header />
				<div ref="mainBox" className="main">
					22
				</div>
				<Footer />
			</div>
		);
	}
}
