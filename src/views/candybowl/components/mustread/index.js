import React, { Component } from "react";
import "./index.less";
class MustRead extends Component {
	render() {
		const { content } = this.props;
		console.log(content);
		return (
			<div className="mustread-box">
				<div className="mustread-bg">2</div>
				<div className="mustread-cont">
					<div className="mustread-container">22</div>
				</div>
			</div>
		);
	}
}

export default MustRead;
