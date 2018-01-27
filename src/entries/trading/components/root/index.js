import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			page: 1,
			mounted: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
		window.TradingAjaxDone = true;

		document.title = "InWe-" + i18n.t("navMenu.trading", this.props.lng);

		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH,
			mounted: true
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}
	handleScroll() {
		if (!IsTouchDevice) return;
		let footerDom = document.getElementById("footerBox");
		let winHei = document.documentElement.clientHeight;
		if (!footerDom) return;
		let footerToTopHei = footerDom.getBoundingClientRect().bottom - 10;
		let pathName = location.pathname;
		if (
			footerToTopHei <= winHei &&
			pathName == "/trading" &&
			this.state.mounted
		) {
			var UlDom = document.getElementsByClassName("tradingListUl")[0];
			if (!UlDom) return;
			var liDom = UlDom.getElementsByTagName("li");
			console.log(liDom.length);
			//手机默认请求10条
			if (liDom.length < 10) return;
			var pageIndex = parseInt(liDom.length / 10) + 1;

			if (window.TradingAjaxDone) {
				window.TradingAjaxDone = false;
				this.props.getTradingM({
					type: 4,
					per_page: 10,
					page: pageIndex
				});
			}
		}
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			page: q.page || "1"
		});
		if (IsTouchDevice) {
			var pageSize = 10;
		} else {
			var pageSize = 6;
		}
		this.props
			.getTrading({
				per_page: pageSize,
				page: q.page || 1,
				type: 4
			})
			.then(res => {
				console.log(res);
			});
	}
	render() {
		const { minH, liH, page } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			trading,
			commonMarket,
			getHeaderMarket
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
							commonMarket={commonMarket}
							getHeaderMarket={getHeaderMarket}
						/>
						<div id="mainBox" className="trading ui">
							{!IsTouchDevice && (
								<div className="left-menus ui center">
									<div className="left-menus-trading">
										<LeftMenu lng={lng} />
									</div>
								</div>
							)}

							<div id="tradingBox" className="tradingBox ui f1">
								<div className="annoBoxArrow ui center m-hide">
									{trading.prev_page_url && (
										<Link
											to={{
												pathname: "/trading",
												search:
													"?page=" +
													(trading.current_page - 1)
											}}
										>
											<span className="leftArrow more" />
										</Link>
									)}
									{!trading.prev_page_url && (
										<span className="leftArrow" />
									)}
								</div>

								<ul id="m-tradingUl" className="tradingListUl">
									{trading &&
										trading.data &&
										trading.data.length > 0 &&
										trading.data.map((item, index) => {
											return (
												<li
													className="ui"
													key={index}
													style={{ maxHeight: liH }}
												>
													<Link
														to={{
															pathname:
																"/newsdetail",
															search: `?art_id=${
																item.id
															}`
														}}
													>
														<div className="tradingBoxImg">
															<img
																src={item.img}
																alt=""
															/>
														</div>
														<div className="tradingBoxCon">
															<p className="tradingBoxTitle ellitext">
																{item.title}
															</p>
															<p className="desc">
																{item.desc}
															</p>
															<div className="tradingBoxModConDate">
																<p>
																	{
																		item.created_at
																	}
																</p>
															</div>
														</div>
													</Link>
												</li>
											);
										})}

									{(!trading ||
										!trading.data ||
										trading.data.length <= 0) && (
										<div
											style={{
												textAlign: "center",
												padding: "2rem 0"
											}}
										>
											{t("nodata", lng)}
										</div>
									)}
								</ul>
								<div className="annoBoxArrow ui center m-hide">
									{trading.next_page_url && (
										<Link
											to={{
												pathname: "/trading",
												search:
													"?page=" +
													(trading.current_page + 1)
											}}
										>
											<span className="rightArrow more" />
										</Link>
									)}
									{!trading.next_page_url && (
										<span className="rightArrow" />
									)}
								</div>
							</div>
						</div>
						{IsTouchDevice ? (
							<div id="footerBox" />
						) : (
							<Footer changeLng={changeLng} lng={lng} />
						)}
					</div>
				)}
			</I18n>
		);
	}
}
