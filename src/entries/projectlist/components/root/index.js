import React, { PureComponent } from "react";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.less";

export default class Root extends PureComponent {
	componentDidMount() {
		this.props.getProjectList();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		this.refs.mainBox.style.height = minH + "px";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		return (
			<div className="container">
				<Header />
				<div ref="mainBox" className="projectList ui">
					<div className="projectListRetuen">
						<span />
					</div>
				</div>
			</div>
		);
	}
}
