import React, { PureComponent } from "react";
import Header from "../../../../components/header";
export default class Root extends PureComponent {
	componentDidMount() {
		this.props.getNewsList();
	}
	render() {
		return (
			<div className="container">
				<Header />
				<div>23333</div>
			</div>
		);
	}
}
