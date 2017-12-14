import React, { Component } from "react";
import "./index.less";
class RealTime extends Component {
	setToFixed(num, times = 2) {
		if (!num) {
			return;
		}
		let s = new Number(num);
		let r = (s + 0).toFixed(times);
		return r;
	}
	render() {
		const { typeList, timePrice, website } = this.props;
		// let name = [];
		// if (typeList && typeList.length > 0) {
		// 	typeList.map(item => {
		// 		name.push(item.name);
		// 	});
		// }
		return (
			<div>
				{typeList &&
					typeList.length > 0 &&
					timePrice && (
						<div className="real-time">
							<div className="realtime-title">
								<div className="realtime-txt">当前价格</div>
								{website && (
									<a
										className="gowebsite"
										target="_blank"
										href={website}
									>
										官网
									</a>
								)}
							</div>
							<div className="realtime-box1">
								<span className="realtime-now">
									${typeList[1] &&
										timePrice[typeList[1].name] &&
										this.setToFixed(
											timePrice[typeList[1].name].price
										)}
								</span>
								<span className="realtime-trend">
									{typeList[1] &&
										timePrice[typeList[1].name] &&
										this.setToFixed(
											timePrice[typeList[1].name][
												"24h_change"
											]
										)}%
								</span>
								<div className="btc">
									({typeList[0] &&
										timePrice[`${typeList[0].name}`] &&
										this.setToFixed(
											timePrice[`${typeList[0].name}`]
												.price
										)}BTC)
								</div>
							</div>
							<div className="reactime-box2">
								<div className="realtime-item">
									<div className="left">Volume</div>
									<div className="right">
										{typeList.map((item, index) => {
											return (
												<span key={index}>
													{index == 1 && "$"}
													<span>
														{timePrice[item.name] &&
															this.setToFixed(
																timePrice[
																	item.name
																]["volume"]
															)}
													</span>
													{index == 0 && "BTC"}
													<span
														style={{
															padding: "0 .04rem"
														}}
													>
														{index >=
														typeList.length - 1
															? ""
															: "/"}
													</span>
												</span>
											);
										})}
									</div>
								</div>
								<div className="realtime-item">
									<div className="left">24H最高值</div>
									<div className="right">
										{typeList.map((item, index) => {
											return (
												<span key={index}>
													{index == 1 && "$"}
													<span>
														{timePrice[item.name] &&
															this.setToFixed(
																timePrice[
																	item.name
																][
																	"24h_max_price"
																]
															)}
													</span>
													{index == 0 && "BTC"}
													<span
														style={{
															padding: "0 .04rem"
														}}
													>
														{index >=
														typeList.length - 1
															? ""
															: "/"}
													</span>
												</span>
											);
										})}
									</div>
								</div>
								<div className="realtime-item">
									<div className="left">24H最低值</div>
									<div className="right">
										{typeList.map((item, index) => {
											return (
												<span key={index}>
													{index == 1 && "$"}
													{timePrice[item.name] &&
														this.setToFixed(
															timePrice[
																item.name
															]["24h_min_price"]
														)}
													{index == 0 && "BTC"}
													<span
														style={{
															padding: "0 .04rem"
														}}
													>
														{index >=
														typeList.length - 1
															? ""
															: "/"}
													</span>
												</span>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					)}
			</div>
		);
	}
}
export default RealTime;
