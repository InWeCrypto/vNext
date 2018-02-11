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
import AnnoBox from "../../../../components/annobox";
import TopText from "../toptext/";

import inweWallet from "../../../../assets/images/inwe_wallet.png";
import walletHold from "../../../../assets/images/walletHold.png";
import noCandy from "../../../../assets/images/noCandy.png";
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
			showAnno: false,
			annoItem: null,
			curDay:
				newDate.getDate() < 10
					? "0" + newDate.getDate()
					: newDate.getDate(),
			sliderIndex: 0,
			sliderIndex1: 0,
			sliderIndex2: 0
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
		}
	}
	componentDidMount() {
		document.title = "InWeCrypto";
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
		this.setProjectList();
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
			per_page: 4,
			page: page
		});
	}
	setProjectList(page) {
		this.props.getProject({
			per_page: 10,
			home_article: true
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
		this.props.getAds({
			type: 1
		});
		this.props.getAds2({
			type: 2
		});
	}
	exchangeNotice() {
		this.props.getExchangeNotice({
			per_page: 3
		});
		// if (this.props.userInfo) {
		this.props.getUserFavo({
			// user_favorite: true,
			per_page: 5
		});
		// }
	}
	openAnnobox(item) {
		this.setState({
			showAnno: true,
			annoItem: item
		});
	}
	closeAnnobox() {
		this.setState({
			showAnno: false,
			annoItem: null
		});
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
	turnToPro(id) {
		if (!IsTouchDevice) {
			window.location.href = `projectdetail?c_id=${id}&type=home`;
		}
	}
	getAdsWidth(ads) {
		if (ads && ads.data && ads.data.length) {
			return ads.data.length * 4.98 + "rem";
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
			project,
			candyList,
			userFavo,
			exchangeNotice,
			ads,
			ads2,
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
			sliderIndex1,
			sliderIndex2,
			showAnno,
			annoItem
		} = this.state;
		let curMonth = monthArr[month - 1].slice(0, 3);
		function ucfirst(str) {
			var str = str.toLowerCase();
			var strarr = str.split(" ");
			var result = "";
			for (var i in strarr) {
				result +=
					strarr[i].substring(0, 1).toUpperCase() +
					strarr[i].substring(1) +
					" ";
			}
			return result;
		}
		curMonth = ucfirst(curMonth);
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
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
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
		const settings2 = {
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
					sliderIndex2: index
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
									<div className="homeBoxArticleTop">
										<div
											id="articleSlider"
											className="articleSlider"
											style={
												{
													// maxHeight: AcImgH,
													// height: AcSliderH,
													// overflow: "hidden"
												}
											}
										>
											{articleList &&
												articleList.data &&
												articleList.data.length > 0 && (
													<Slider
														ref={c =>
															(this.slider = c)
														}
														{...settings}
													>
														{articleList.data.map(
															(item, index) => {
																return (
																	<div
																		key={
																			index
																		}
																		className={
																			sliderIndex ==
																			index
																				? "articleSlide cur"
																				: "articleSlide"
																		}
																	>
																		<Link
																			className="sliderBlockA"
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
																				style={
																					{
																						// height: AcImgH
																					}
																				}
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
															this.slider.slickNext();
														}}
													>
														<b />
													</span>
												)}
											{articleList.data &&
												sliderIndex ==
													articleList.data.length -
														1 && (
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
									<div className="homeBoxArticleBottom homeBoxList homeBoxCandy">
										{!IsTouchDevice && (
											<div
												className={
													ads.data &&
													ads.data.length == 1
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
															ads.data.length >
																0 && (
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
								</div>
								<div className="homeRight ui f1">
									<div className="homeRightTop ui f1">
										<div className="homeBoxList homeBoxNews homeBoxPro">
											<div className="homeBoxNewsAll">
												<p className="homeBoxTitle">
													{t("home.project", lng)}
												</p>
												<ul className="homeBoxNewsUl">
													{project &&
														project.data &&
														project.data.length >
															0 &&
														project.data.map(
															(item, index) => {
																return (
																	<li
																		key={
																			index
																		}
																	>
																		<Link
																			className="ui"
																			to={{
																				pathname:
																					"/newsdetail",
																				search:
																					item.last_article &&
																					"?art_id=" +
																						item
																							.last_article
																							.id
																			}}
																			title={
																				item.last_article &&
																				item
																					.last_article
																					.title
																			}
																		>
																			<img
																				src={
																					item.img
																				}
																				alt=""
																				onClick={e => {
																					e.preventDefault();
																					this.turnToPro(
																						item.id
																					);
																				}}
																			/>
																			<p>
																				{item.last_article &&
																					item
																						.last_article
																						.title}
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
														pathname: "/projectlist"
													}}
												>
													<span className="readMore readMoreUnderLine">
														read more
													</span>
													<b className="readMoreImg" />
												</Link>
											</div>
										</div>
										<div className="homeBoxList homeBoxNews">
											<div className="homeBoxNewsTop">
												<div className="homeBoxNewsAll">
													<p className="homeBoxTitle">
														{t("home.news", lng)}
													</p>
													<ul className="homeBoxNewsUl">
														{newsList &&
															newsList.data &&
															newsList.data
																.length > 0 &&
															newsList.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<li
																			key={
																				index
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
																				title={
																					item.title
																				}
																			>
																				<p
																				>
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
											<div className="homeBoxNewsBottom">
												<div className="homeBoxAnnoTop">
													<p className="homeBoxTitle">
														{t("home.anno", lng)}
													</p>
													<div className="homeBoxAnnoList">
														{exchangeNotice &&
															exchangeNotice.data &&
															exchangeNotice.data
																.length > 0 &&
															exchangeNotice.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<p
																			key={
																				index
																			}
																			className="homeBoxAnnoTopP"
																			onClick={this.openAnnobox.bind(
																				this,
																				item
																			)}
																		>
																			+{
																				item.source_name
																			}：
																			{
																				item.desc
																			}
																		</p>
																	);
																}
															)}
													</div>
												</div>
												<div className="homeBoxReadMore">
													<Link
														to={{
															pathname:
																"/announcment"
														}}
													>
														<span className="readMore readMoreUnderLine">
															read more
														</span>
														<b className="readMoreImg" />
													</Link>
												</div>
											</div>
										</div>
										<div
											className="homeBoxList homeBoxCandy"
											onClick={this.turnToCandy.bind(
												this
											)}
											style={{ display: "none" }}
										>
											<div className="homeBoxCandyTop">
												<p className="homeBoxTitle">
													{t("home.candy", lng)}?
												</p>
												<div className="homeBoxCandyTopAll">
													<p className="homeCandyDate">
														<b>{curDay}</b>/{
															curMonth
														}
													</p>
													{candyList.list &&
														candyList.list.data &&
														candyList.list.data
															.length > 0 &&
														candyList.list.data.map(
															(item, index) => {
																return (
																	<Link
																		key={
																			index
																		}
																		to={{
																			pathname:
																				"/candybowl"
																		}}
																	>
																		<span
																			key={
																				index
																			}
																			className="homeCandySpan"
																		>
																			+{
																				item.name
																			}
																		</span>
																	</Link>
																);
															}
														)}
													{candyList &&
														candyList.list &&
														candyList.list.data &&
														candyList.list.data
															.length == 0 && (
															<div className="noCandy ui center">
																<img
																	src={
																		noCandy
																	}
																	alt=""
																/>
															</div>
														)}
												</div>
											</div>
										</div>
										<div className="homeBoxList homeBoxAnno homeBoxAnnoAll">
											{!IsTouchDevice &&
												userFavo &&
												userFavo.data &&
												userFavo.data.length > 0 && (
													<div className="homeBoxFllow">
														<div className="homeBoxFllowAll">
															<p className="homeBoxTitle">
																{t(
																	"home.follow",
																	lng
																)}
															</p>
															<ul className="homeBoxFllowUl">
																{userFavo.data.map(
																	(
																		item,
																		index
																	) => {
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
																	pathname:
																		"/member",
																	search:
																		"?type=collection"
																}}
																onClick={e => {
																	e.preventDefault();
																	if (
																		userInfo
																	) {
																		window.location.href =
																			"/member?type=collection";
																	} else {
																		window.headerBox.setState(
																			{
																				showLogin: true
																			}
																		);
																	}
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
											<div className="homeBoxAnnoBottm">
												<div className="homeBoxCandyTop">
													<p className="homeBoxTitle">
														{t("home.candy", lng)}
													</p>
													<div className="homeBoxCandyTopAll">
														<p className="homeCandyDate">
															<b>{curDay}</b>/{
																curMonth
															}
														</p>
														{candyList.list &&
															candyList.list
																.data &&
															candyList.list.data
																.length > 0 &&
															candyList.list.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<Link
																			key={
																				index
																			}
																			to={{
																				pathname:
																					"/candybowl"
																			}}
																		>
																			<span
																				key={
																					index
																				}
																				className="homeCandySpan"
																			>
																				+{
																					item.name
																				}
																			</span>
																		</Link>
																	);
																}
															)}
														{candyList &&
															candyList.list &&
															candyList.list
																.data &&
															candyList.list.data
																.length ==
																0 && (
																<div className="noCandy ui center">
																	<img
																		src={
																			noCandy
																		}
																		alt=""
																	/>
																</div>
															)}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="homeRightBottom">
										<div
											style={{
												height: "100%",
												width: "100%"
											}}
										>
											{ads2 &&
												ads2.data &&
												ads2.data.length > 0 && (
													<Slider
														ref={c =>
															(this.slider2 = c)
														}
														{...settings2}
													>
														{ads2.data.map(
															(item, index) => {
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
										<div className="ads2Arrow">
											{/* <span className="rtArrow more" />
											<span className="lfArrow" /> */}
											{ads2.data &&
												ads2.data.length > 1 &&
												ads2.data.length - 1 !==
													sliderIndex2 && (
													<span
														className="rtArrow more"
														onClick={() => {
															this.slider2.slickNext();
														}}
													/>
												)}
											{ads2.data &&
												ads2.data.length > 1 &&
												ads2.data.length - 1 ==
													sliderIndex2 && (
													<span className="rtArrow" />
												)}
											{ads2.data &&
												ads2.data.length > 1 &&
												sliderIndex2 !== 0 && (
													<span
														className="lfArrow more"
														onClick={() => {
															this.slider2.slickPrev();
														}}
													/>
												)}
											{ads2.data &&
												ads2.data.length > 1 &&
												sliderIndex2 == 0 && (
													<span className="lfArrow" />
												)}
										</div>
									</div>
								</div>
								{IsTouchDevice && (
									<div className="homeBoxList homeBoxWallet">
										<div className="swiperBox">
											<ul
												className="walletUl"
												style={{
													width: this.getAdsWidth.bind(
														this,
														ads
													)
												}}
											>
												{ads.data &&
													ads.data.length > 0 &&
													ads.data.map((val, idx) => {
														return (
															<li
																style={
																	ads.data
																		.length ==
																		1 && {
																		margin:
																			"0 auto",
																		float:
																			"none"
																	}
																}
																key={val}
																className="walletImg"
																onClick={() => {
																	window.location.href =
																		val.url;
																}}
															>
																<img
																	src={
																		val.img
																	}
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
						{showAnno && (
							<AnnoBox
								item={annoItem}
								close={this.closeAnnobox.bind(this)}
							/>
						)}

						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
