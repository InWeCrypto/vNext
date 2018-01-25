import React, { PureComponent } from "react";
import closeImg from "../../assets/images/close_white.png";

import "./index.less";

class TurnApp extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			advHide: false
		};
	}

	componentWillMount() {}

	closePop(e) {
		this.setState({
			advHide: true
		});
	}
	render() {
		const { advHide } = this.state;
		if (!IsTouchDevice || advHide) {
			return null;
		}
		return (
			<div className="turnapp-box">
				<div className="turnapp-logo">
					{/* <img src={closeImg} alt="" /> */}
				</div>
				<div className="turnapp-text">
					<span className="text1">InWeCrpyto</span>
					<span className="text2">in crypto we trust</span>
				</div>
				<div className="turnapp-btn">Download</div>
				<div />
				<div
					className="turnapp-close"
					onClick={this.closePop.bind(this)}
				>
					<img src={closeImg} alt="" />
				</div>
			</div>
		);
	}
}
export default TurnApp;
