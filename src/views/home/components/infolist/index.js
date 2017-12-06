import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import "./index.less";
import walletpng from "../../../../lib/images/wallet.png";
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
		} else if (w > 750 && w <= 1000) {
			this.setState({
				itemW: (w - 20) / 2
			});
		} else {
			this.setState({
				itemW: w
			});
		}
	}
	setMonth(m) {
		const me = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		if (m) {
			return me[m - 1];
		}
	}
	render() {
		let { infoList, candyData } = this.props;
		return (
			<div className="info-box">
				<StackGrid
					style={{ width: "100%" }}
					gutterWidth={10}
					gutterHeight={10}
					columnWidth={this.state.itemW}
					monitorImagesLoaded={true}
				>
					{candyData &&
						candyData.length > 0 && (
							<div className="info-item candy-box">
								<div className="candy-title">Candy Bowl</div>
								<div className="candy-day">
									<span className="day">
										{candyData[0].day}
									</span>
									<div className="month">
										{this.setMonth(candyData[0].month)}
									</div>
								</div>
								<div className="product-list">
									{candyData.map((item, index) => {
										return (
											<div
												key={index}
												className="product-item"
											>
												<a href="">{item.name}</a>
											</div>
										);
									})}
								</div>
							</div>
						)}

					<div className="info-item wallet">
						<div className="wallet-title">IN WE WALLET</div>
						<div className="wallet-desc">多数字资产管理钱包</div>
						<div className="wallet-img">
							<img src={walletpng} />
						</div>
					</div>
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
