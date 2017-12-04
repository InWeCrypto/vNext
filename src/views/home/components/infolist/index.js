import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import "./index.less";
class InfoBox extends Component {
	constructor() {
		super();
		this.state = {
			itemW: 0
		};
	}
	componentDidMount() {
		this.setW();
		window.onresize = () => {
			this.setW();
		};
	}
	setW() {
		if (!document) {
			return;
		}
		console.log(11);
		var w = document.body.clientWidth;
		if (w >= 1000) {
			this.setState({
				itemW: 980 / 3
			});
		} else {
			this.setState({
				itemW: w
			});
		}
	}
	render() {
		let { infoList } = this.props;
		console.log(infoList);
		return (
			<div className="info-box">
				<StackGrid columnWidth={this.state.itemW}>
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
