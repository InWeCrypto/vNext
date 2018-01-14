import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-Trading";
		this.props.getTrading();
		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto"
		};
	}
	render() {
		const { minH, liH } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header />
						<div id="mainBox" className="trading ui">
							<div className="left-menus ui center">
								<div className="left-menus-trading">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="tradingBox" className="tradingBox ui f1">
								<div className="annoBoxArrow ui center">
									<span className="leftArrow" />
								</div>

								<ul className="">
									{[1, 2, 3, 4, 5].map((item, index) => {
										return (
											<li
												className="ui"
												key={index}
												style={{ maxHeight: liH }}
											>
												<div className="tradingBoxImg">
													<img
														src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515681385865&di=5470a46770b7e7a80ef72d15df368fd9&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172421_QKF4K.thumb.600_0.jpeg"
														alt=""
													/>
												</div>
												<div className="tradingBoxCon">
													<p className="tradingBoxTitle ellitext">
														支撑拖住，等待上涨信号
													</p>
													<p className="desc">
														纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案
													</p>
													<div className="tradingBoxModConDate">
														<p>
															2017-11-16 11:35:33
														</p>
													</div>
												</div>
											</li>
										);
									})}
								</ul>
								<div className="annoBoxArrow ui center">
									<span className="rightArrow more" />
								</div>
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
