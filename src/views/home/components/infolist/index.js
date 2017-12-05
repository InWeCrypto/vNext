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
		return (
			<div className="info-box">
				<StackGrid
					style={{ width: "100%" }}
					gutterWidth={10}
					gutterHeight={10}
					columnWidth={this.state.itemW}
					monitorImagesLoaded={true}
				>
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
