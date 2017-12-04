import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import "./index.less";
class InfoBox extends Component {
	componentDidMount() {}
	setW() {
		if (!document) {
			return;
		}
		var w = document.body.clientWidth;
		if (w >= 1000) {
			return 980 / 3;
		} else {
			return w;
		}
	}
	render() {
		let { infoList } = this.props;
		console.log(infoList);
		return (
			<div className="info-box">
				<StackGrid columnWidth={this.setW()}>
					{infoList &&
						infoList.length > 0 &&
						infoList.map((item, index) => {
							return (
								<div key={index} className="info-item">
									{item.type != 1 && (
										<img className="img" src={item.img} />
									)}
									<div className="info-title">
										{item.title}
									</div>
									<div className="info-time">
										{item.created_at}
									</div>
								</div>
							);
						})}
				</StackGrid>
			</div>
		);
	}
}
export default InfoBox;
