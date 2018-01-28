import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import { Pagination } from "antd";

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
			newsList: [],
			nums: 8
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
	changePagination(page) {
		this.getNewsList({
			type: this.state.type,
			page: page
		});
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			page: q.page || "1",
			type: q.type || "2"
		});
		this.getNewsList(q);
	}
	getNewsList(q) {
		if (q.type && q.type == "3") {
			this.props
				.getNewsVideo({
					per_page: this.state.nums,
					page: q.page || this.state.page,
					type: q.type || this.state.type
				})
				.then(res => {
					this.setState({
						newsList: res.data
					});
				});
		} else {
			this.props
				.getNewsImg({
					per_page: this.state.nums,
					page: q.page || this.state.page,
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
		const { minH, liH, page, newsList, type } = this.state;
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
								<div className="annoTitle">
									{type == 2 ? (
										<span>{t("news.ceefax", lng)}</span>
									) : (
										<span>{t("news.videoTitle", lng)}</span>
									)}
								</div>
								<ul className="tradingListUl f1">
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
														<p className="desc">
															{item.title}
														</p>
														<div className="newsBoxModConDate">
															<p>
																{
																	item.created_at
																}
															</p>
															{item.category &&
																item.category
																	.img && (
																	<img
																		className="m-hide"
																		src={
																			item
																				.category
																				.img
																		}
																		alt=""
																	/>
																)}
														</div>
														<div className="newsBoxModConShow">
															<img
																src={item.img}
																alt=""
															/>
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
								<div
									className="pagation-box m-hide"
									id="pagationBox"
								>
									{newsList && (
										<Pagination
											defaultPageSize={this.state.nums}
											defaultCurrent={
												newsList.current_page
											}
											total={newsList.total}
											onChange={this.changePagination.bind(
												this
											)}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
