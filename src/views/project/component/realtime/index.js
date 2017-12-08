import React, { Component } from "react";
import "./index.less";
class RealTime extends Component {
	render() {
		return (
			<div className="real-time">
				<div className="realtime-title">当前价格</div>
				<div className="realtime-box1">
					<span className="realtime-now">$232s</span>
					<span className="realtime-trend">-24</span>
					<div>(0.0012BTC)</div>
				</div>
				<div className="reactime-box2">
					<div className="realtime-item">
						<div className="left">2</div>
						<div className="right">2</div>
					</div>
				</div>
			</div>
		);
	}
}
export default RealTime;
