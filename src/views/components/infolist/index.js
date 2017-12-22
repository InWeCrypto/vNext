import React, { Component } from "react";
import StackGrid from "react-stack-grid";
import { Link } from "react-router-dom";
import "./index.less";
import walletpng from "../../../lib/images/wallet.png";
import playbtn from "../../../lib/images/playvideo.png";
class InfoBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemW: 0,
			showCandyBowl: props.showCandyBowl ? props.showCandyBowl : false,
			showWallet: props.showWallet ? props.showWallet : false
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
					gridRef={grid => (this.grid = grid)}
					gutterWidth={10}
					gutterHeight={10}
					columnWidth={this.state.itemW}
					monitorImagesLoaded={true}
				>
					{this.state.showCandyBowl && (
						<Link
							to={{
								pathname: "/candybowl"
							}}
						>
							<div className="info-item candy-box">
								<div className="candy-title">Candy Bowl</div>
								<div className="candy-day">
									<span className="day">
										{new Date().getDate()}
									</span>
									<div className="month">
										{this.setMonth(
											new Date().getMonth() + 1
										)}
									</div>
								</div>
								<div className="product-list">
									{candyData &&
										candyData.length > 0 &&
										candyData.map((item, index) => {
											return (
												<div
													key={index}
													className="product-item"
												>
													<span href="">
														{item.name}
													</span>
												</div>
											);
										})}
								</div>
							</div>
						</Link>
					)}
					{this.state.showWallet && (
						<div
							onClick={
								this.props.showDownWallet
									? this.props.showDownWallet
									: ""
							}
							className="info-item wallet"
						>
							<div className="wallet-img">
								<img src={walletpng} />
							</div>
						</div>
					)}

					{infoList &&
						infoList.length > 0 &&
						infoList.map((item, index) => {
							return (
								<Link
									to={{
										pathname: "/news-detail",
										search: "?id=" + item.id
									}}
									key={index}
								>
									<div className="info-item">
										{item.type == 2 && (
											<img
												className="img"
												src={item.img}
											/>
										)}
										{item.type == 3 && (
											<div className="videobox">
												<img
													className="img"
													src={item.img}
												/>
												<div className="videobox-cover">
													<img src={playbtn} />
												</div>
											</div>
										)}
										<div className="info-title">
											{item.title}
										</div>
										<div className="info-time">
											{item.created_at}
										</div>
									</div>
								</Link>
							);
						})}
				</StackGrid>
			</div>
		);
	}
}
export default InfoBox;
