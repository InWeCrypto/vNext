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
			lfMore: "leftArrow",
			rtMore: "rightArrow more",
			page: 1,
			nums: 8,
			mounted: false,
			newsTextCur: 1
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		setTimeout(() => {
			document.title = "InWe-" + i18n.t("navMenu.news", this.props.lng);
			let minH = getMainMinHeight();
			let liH = minH / 2;
			this.setState({
				minH: minH,
				liH: liH,
				mounted: true
			});
			document.querySelector("#mainBox").style.minHeight = minH + "px";
			this.initPage(this.props.location.search);
		}, 0);
	}
	initPage(location) {
		let p = getQuery(location);
		let annoBoxH =
			document.getElementById("annoCon").clientHeight -
			document.getElementById("pagationBox").clientHeight;
		let annoBoxLiH = 108;
		let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		if (p.page) {
			this.setState({
				page: p.page || 1
			});
		}
		this.setState({
			nums: nums
		});
		if (IsTouchDevice) {
			nums = 10;
		}
		this.props
			.getNewsText({
				type: 1,
				per_page: nums,
				page: p.page || 1
			})
			.then(res => {
				if (res.code === 4000) {
					return;
					this.setState({
						newsTextCur: res.data.current_page
					});
				}
			});
	}
	changePagination(page) {
		this.props.getAnnouncment({
			page: page,
			per_page: this.state.nums
		});
	}
	annoMove(val) {
		if (val == "left" && this.state.lfMore == "leftArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		} else if (val == "right" && this.state.rtMore == "rightArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		}
	}
	render() {
		const { minH, liH, rtMore, lfMore } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			newslisttext,
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
						<div id="mainBox" className="anno ui">
							<div id="annoBox" className="annoBox ui f1">
								<div className="annoTitle">
									<span>{t("news.news", lng)}</span>
								</div>
								<div id="annoCon" className="annoCon ui f1">
									<div className="f1 left">
										<ul>
											{newslisttext &&
												newslisttext.data &&
												newslisttext.data.length > 0 &&
												newslisttext.data.map(
													(item, index) => {
														if (index % 2 == 0) {
															return null;
														}
														return (
															<li
																key={index}
																className="annoucmentListLi"
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
																	<div className="liBox">
																		<p className="annoBoxLiText ellitext">
																			{
																				item.title
																			}
																		</p>
																		<div className="annoBoxLiDate">
																			<p className="">
																				{getLocalTime(
																					item.created_at
																				)}
																			</p>

																			{item.category &&
																				item
																					.category
																					.img && (
																					<img
																						src={
																							item
																								.category
																								.img
																						}
																						alt=""
																					/>
																				)}
																		</div>
																	</div>
																</Link>
															</li>
														);
													}
												)}
										</ul>
									</div>
									<div className="f1">
										<ul className="ui annoucmentListUl">
											{newslisttext &&
												newslisttext.data &&
												newslisttext.data.length > 0 &&
												newslisttext.data.map(
													(item, index) => {
														if (index % 2 == 1) {
															return null;
														}
														return (
															<li
																key={index}
																className="annoucmentListLi"
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
																	<div className="liBox">
																		<p className="annoBoxLiText ellitext">
																			{
																				item.title
																			}
																		</p>
																		<div className="annoBoxLiDate">
																			<p className="">
																				{getLocalTime(
																					item.created_at
																				)}
																			</p>

																			{item.category &&
																				item
																					.category
																					.img && (
																					<img
																						src={
																							item
																								.category
																								.img
																						}
																						alt=""
																					/>
																				)}
																		</div>
																	</div>
																</Link>
															</li>
														);
													}
												)}
										</ul>
									</div>
								</div>
								<div
									className="pagation-box m-hide"
									id="pagationBox"
								>
									{newslisttext && (
										<Pagination
											defaultPageSize={
												this.state.per_page
											}
											defaultCurrent={
												newslisttext.current_page
											}
											total={newslisttext.total}
											onChange={this.changePagination.bind(
												this
											)}
										/>
									)}
								</div>
							</div>
						</div>
						{IsTouchDevice && <div id="footerBox" />}
					</div>
				)}
			</I18n>
		);
	}
}
