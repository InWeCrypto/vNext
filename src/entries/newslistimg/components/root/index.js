import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import {
	getMainMinHeight,
	getQuery,
	getLocalTime
} from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";

import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			page: 1,
			type: 2,
			newsList: []
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.trading", this.props.lng);

		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			page: q.page || "1",
			type: q.type || "2"
		});
		if (q.type && q.type == "3") {
			this.props
				.getNewsVideo({
					per_page: 8,
					page: q.page || 1,
					type: q.type || this.state.type
				})
				.then(res => {
					console.log(res);
				});
		} else {
			this.props
				.getNewsImg({
					per_page: 8,
					page: q.page || 1,
					type: q.type || this.state.type
				})
				.then(res => {
					this.setState({
						newsList: res.data
					});
				});
		}
	}
	render() {
		const { minH, liH, page, newsList } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			commonMarket,
			getHeaderMarket
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						{!IsTouchDevice && (
							<FixedMenu changeLng={changeLng} lng={lng} />
						)}
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
							<div id="tradingBox" className="tradingBox ui f1">
								<ul className="tradingListUl">
									{newsList &&
										newsList.data &&
										newsList.data.length > 0 &&
										newsList.data.map((item, index) => {
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
																	{getLocalTime(
																		item.created_at
																	)}
																</p>
															</div>
														</div>
													</Link>
												</li>
											);
										})}

									{(!newsList ||
										!newsList.data ||
										newsList.data.length <= 0) && (
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
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
