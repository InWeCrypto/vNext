import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import Slider from "react-slick";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import Search from "../../../../components/search";
import TopText from "../toptext/";

import inweWallet from "../../../../assets/images/inwe_wallet.png";
import walletHold from "../../../../assets/images/walletHold.png";
import "./index.less";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		const newDate = new Date();
		this.state = {
			AcImgH: "auto",
			year: newDate.getFullYear(),
			month: newDate.getMonth() + 1,
			monthArr: [
				"january",
				"february",
				"march",
				"april",
				"may",
				"june",
				"july",
				"august",
				"september",
				"october",
				"november",
				"december"
			],
			curDay:
				newDate.getDate() < 10
					? "0" + newDate.getDate()
					: newDate.getDate(),
			sliderIndex: 0,
			sliderIndex1: 0
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.home", this.props.lng);
		setTimeout(() => {
			let minH = getMainMinHeight();
			let th = document.querySelector("#topText").clientHeight;
			document.querySelector("#mainBox").style.minHeight =
				minH - th + "px";
			let AcSliderW = document.getElementById("articleSlider")
				.clientWidth;
			let AcImgH = AcSliderW * 168 / 294;
			let AcSliderH = AcSliderW * 348 / 294;
			this.setState({
				AcImgH: AcImgH,
				AcSliderH: AcSliderH
			});
		}, 0);

		// document.getElementById("homeBoxArticleImg").style.maxHeight =
		// 	AcImgH + "px";
		this.setArticleList();
		this.setNewsList(1);
		this.getData(this.state.year, this.state.month, this.state.curDay);
		// this.getData(this.state.year, this.state.month, 24);
		this.setAds();
		this.exchangeNotice();
	}
	setArticleList(page) {
		this.props.getArticleList({
			type: "[2,3,4]",
			is_scroll: true
		});
	}
	setNewsList(page) {
		this.props.getNewsList({
			type: "[1]",
			per_page: 5,
			page: page
		});
	}
	getData(year, month, day) {
		let query = "?";
		query += `year=${year}`;
		query += `&month=${month}`;
		query += `&day=${day}`;
		query += `&per_page=2`;
		this.props.getCandyList(query);
	}
	setAds() {
		this.props.getAds();
	}
	exchangeNotice() {
		this.props.getExchangeNotice({
			per_page: 2
		});
		if (this.props.userInfo) {
			this.props.getUserFavo({
				user_favorite: true,
				per_page: 3
			});
		}
	}

	turnToCandy() {
		if (IsTouchDevice) {
			window.location.href = "/candybowl";
		}
	}
	turnToAnno() {
		if (IsTouchDevice) {
			window.location.href = "/announcment";
		}
	}
	render() {
		const {
			lng,
			changeLng,
			registerUser,
			userInfo,
			sendEmailCode,
			loginIn,
			setReduxUserInfo,
			forgetUser,
			articleList,
			newsList,
			candyList,
			userFavo,
			exchangeNotice,
			ads,
			commonMarket,
			getHeaderMarket
		} = this.props;
		const {
			month,
			monthArr,
			curDay,
			AcImgH,
			AcSliderH,
			showSearch,
			sliderIndex,
			sliderIndex1
		} = this.state;
		const curMonth = monthArr[month - 1].slice(0, 3);
		if (IsTouchDevice) {
			var settings = {
				// dots: true,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				// autoplay: true,
				arrows: false,
				accessibility: true,
				adaptiveHeight: true,
				afterChange: function(index) {
					this.setState({
						sliderIndex: index
					});
				}.bind(this)
			};
		} else {
			var settings = {
				// dots: true,
				infinite: false,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				// autoplay: true,
				arrows: false,
				accessibility: true,
				adaptiveHeight: true,
				fade: true,
				afterChange: function(index) {
					this.setState({
						sliderIndex: index
					});
				}.bind(this)
			};
		}

		const settings1 = {
			// dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			// autoplay: true,
			arrows: false,
			accessibility: true,
			adaptiveHeight: true,
			afterChange: function(index) {
				this.setState({
					sliderIndex1: index
				});
			}.bind(this)
		};
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container m-container">
						{/* <FixedMenu changeLng={changeLng} lng={lng} /> */}
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
						<div id="topText" className="top-text">
							<TopText lng={lng} />
						</div>
						<div id="mainBox" className="main home ui">
							<div className="left-menus ui center m-hide">
								<div className="left-menu-home">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div
								id="homeBox"
								className="homeBox ui f1 m-home-mainBox"
							>
								<div className="homeBoxList homeBoxArticle">
									<div
										id="articleSlider"
										className="articleSlider"
										style={{
											// maxHeight: AcImgH,
											height: AcSliderH,
											overflow: "hidden"
										}}
									>
										{articleList &&
											articleList.data &&
											articleList.data.length > 0 && (
												<Slider
													ref={c => (this.slider = c)}
													{...settings}
												>
													{articleList.data.map(
														(item, index) => {
															return (
																<div
																	key={index}
																	className={
																		sliderIndex ==
																		index
																			? "articleSlide cur"
																			: "articleSlide"
																	}
																>
																	<Link
																		to={{
																			pathname:
																				"/newsdetail",
																			search:
																				"?art_id=" +
																				item.id
																		}}
																	>
																		<p className="homeBoxTitle">
																			{
																				item.title
																			}
																		</p>
																		<div
																			id="homeBoxArticleImg"
																			className="homeBoxArticleImg"
																			style={{
																				height: AcImgH
																			}}
																		>
																			<img
																				src={
																					item.img
																				}
																				height="100%"
																				alt=""
																			/>
																		</div>
																		<p className="homeBoxArticleDesc">
																			{
																				item.desc
																			}
																		</p>
																	</Link>
																</div>
															);
														}
													)}
												</Slider>
											)}
									</div>
									<div className="homeBoxArticleBtn">
										{articleList.data &&
											articleList.data.length - 1 !==
												sliderIndex && (
												<span
													className="more right ui center jcenter"
													onClick={() => {
														// this.setArticleList(
														// 	articleList.current_page + 1
														// );
														this.slider.slickNext();
													}}
												>
													<b />
												</span>
											)}
										{articleList.data &&
											sliderIndex ==
												articleList.data.length - 1 && (
												<span className="right ui center jcenter">
													<b />
												</span>
											)}
										{sliderIndex !== 0 && (
											<span
												className="more left ui center jcenter"
												onClick={() => {
													// this.setArticleList(
													// 	articleList.current_page - 1
													// );
													this.slider.slickPrev();
												}}
											>
												<b />
											</span>
										)}
										{sliderIndex == 0 && (
											<span className="left ui center jcenter">
												<b />
											</span>
										)}
									</div>
								</div>
								<div className="homeBoxList homeBoxNews">
									<div className="homeBoxNewsAll">
										<p className="homeBoxTitle">
											{t("home.news", lng)}
										</p>
										<ul className="homeBoxNewsUl">
											{newsList &&
												newsList.data &&
												newsList.data.length > 0 &&
												newsList.data.map(
													(item, index) => {
														return (
															<li key={index}>
																<Link
																	to={{
																		pathname:
																			"/newsdetail",
																		search:
																			"?art_id=" +
																			item.id
																	}}
																>
																	<p>
																		{
																			item.title
																		}
																	</p>
																</Link>
															</li>
														);
													}
												)}
										</ul>
									</div>
									<div className="homeBoxReadMore">
										<Link
											to={{
												pathname: "/news"
											}}
										>
											<span className="readMore readMoreUnderLine">
												read more
											</span>
											<b className="readMoreImg" />
										</Link>
									</div>
								</div>
								<div
									className="homeBoxList homeBoxCandy"
									onClick={this.turnToCandy.bind(this)}
								>
									<div className="homeBoxCandyTop">
										<p className="homeBoxTitle">
											{t("home.candy", lng)}?
										</p>
										<div className="homeBoxCandyTopAll">
											<p className="homeCandyDate">
												<b>{curDay}</b>/{curMonth}
											</p>
											{candyList.list &&
												candyList.list.data &&
												candyList.list.data.length >
													0 &&
												candyList.list.data.map(
													(item, index) => {
														return (
															<Link
																key={index}
																to={{
																	pathname:
																		"/candybowl"
																}}
															>
																<span
																	key={index}
																	className="homeCandySpan"
																>
																	+{item.name}
																</span>
															</Link>
														);
													}
												)}
										</div>
									</div>
									{!IsTouchDevice && (
										<div
											className={
												ads.data && ads.data.length == 1
													? "homeInweWallet one ui"
													: "homeInweWallet ui"
											}
										>
											{ads.data &&
												ads.data.length > 1 &&
												sliderIndex1 !== 0 && (
													<div className="walletLf ui center jcenter">
														<span
															className="more"
															onClick={() => {
																this.slider1.slickPrev();
															}}
														/>
													</div>
												)}
											{ads.data &&
												ads.data.length > 1 &&
												sliderIndex1 == 0 && (
													<div className="walletLf ui center jcenter">
														<span className="" />
													</div>
												)}
											<div className="homeInweWalletUl f1 ui center">
												<div
													style={{
														height: "100%",
														width: "100%"
													}}
												>
													{ads.data &&
														ads.data.length > 0 && (
															<Slider
																ref={c =>
																	(this.slider1 = c)
																}
																{...settings1}
															>
																{ads.data.map(
																	(
																		item,
																		index
																	) => {
																		return (
																			<a
																				href={
																					item.url
																				}
																				style={{
																					display:
																						"block"
																				}}
																				key={
																					index
																				}
																			>
																				<img
																					src={
																						item.img
																					}
																				/>
																			</a>
																		);
																	}
																)}
															</Slider>
														)}
												</div>
											</div>
											{ads.data &&
												ads.data.length > 1 &&
												ads.data.length - 1 !==
													sliderIndex1 && (
													<div className="walletRt ui center jcenter">
														<span
															className="more"
															onClick={() => {
																this.slider1.slickNext();
															}}
														/>
													</div>
												)}
											{ads.data &&
												ads.data.length > 1 &&
												ads.data.length - 1 ==
													sliderIndex1 && (
													<div className="walletRt ui center jcenter">
														<span className="" />
													</div>
												)}
										</div>
									)}
								</div>
								<div className="homeBoxList homeBoxAnno homeBoxAnnoAll">
									<div className="homeBoxAnnoTop">
										<p className="homeBoxTitle">
											{t("home.anno", lng)}
										</p>
                                        <div className="homeBoxAnnoList">
                                        {exchangeNotice &&
											exchangeNotice.data &&
											exchangeNotice.data.length > 0 &&
											exchangeNotice.data.map(
												(item, index) => {
													return (
														<p
															key={index}
															className="homeBoxAnnoTopP"
														>
															{item.source_url && (
																<Link
																	to={{
																		pathname:
																			item.source_url
																	}}
																	target="_blank"
																>
																	+{
																		item.source_name
																	}：{
																		item.content
																	}
																</Link>
															)}
															{!item.source_url && (
																<Link
																	to={{
																		pathname:
																			"newsdetail",
																		search:
																			"?art_id=" +
																			item.id
																	}}
																>
																	+{
																		item.source_name
																	}：{
																		item.content
																	}
																</Link>
															)}
														</p>
													);
												}
											)}
                                        </div>
									</div>
									<div className="homeBoxReadMore">
										<Link
											to={{
												pathname: "/announcment"
											}}
										>
											<span className="readMore">
												Read more
											</span>
											<b className="readMoreImg" />
										</Link>
									</div>
									{!IsTouchDevice &&
										userFavo &&
										userFavo.data &&
										userFavo.data.length > 0 && (
											<div className="homeBoxFllow">
												<div className="homeBoxFllowAll">
													<p className="homeBoxTitle">
														{t("home.follow", lng)}…
													</p>
													<ul className="homeBoxFllowUl">
														{userFavo.data.map(
															(item, index) => {
																return (
																	<li
																		key={
																			index
																		}
																		className="ui center jcenter"
																		onClick={() => {
																			window.location.href = `/projectdetail?c_id=${
																				item.id
																			}`;
																		}}
																	>
																		<img
																			src={
																				item.img
																			}
																			alt=""
																		/>
																		<span className="f1 ellitext">
																			{
																				item.name
																			}
																		</span>
																	</li>
																);
															}
														)}
													</ul>
												</div>
												<div className="homeBoxReadMore">
													<Link
														to={{
															pathname: "/member",
															search:
																"?type=collection"
														}}
													>
														<span className="readMore readMoreUnderLine">
															read more
														</span>
														<b className="readMoreImg" />
													</Link>
												</div>
											</div>
										)}
								</div>
								{IsTouchDevice && (
									<div className="homeBoxList homeBoxWallet">
										<div className="swiperBox">
											<ul
												className="walletUl"
												style={{
													width:
														[1, 2, 3, 4].length *
															4.98 +
														"rem"
												}}
											>
												{[1, 2, 3, 4].map(val => {
													return (
														<li
															key={val}
															className="walletImg"
														>
															<img
																src={walletHold}
																alt=""
															/>
														</li>
													);
												})}
											</ul>
										</div>
									</div>
								)}
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
