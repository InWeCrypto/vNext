import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import Slider from "react-slick";

import {
	getMainMinHeight,
	getQuery,
	queryString,
	getLocalTime
} from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import videoIcon from "../../../../assets/images/zixun_play.png";
import "./index.less";


var twitterCard = require('twitter-card');


export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			newsTextCur: 0,
			newsImgCur: 0,
			newsVideoCur: 0,
			mounted: false
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		/*
		
		
		
		twitterCard({
		   "type" : "summary|summary-large|photo|image|gallery|player",
		   "url"  : "https://www.evernote.com",
		   "handle" : "@evernote",
		   "creator": "@augburto",
		   "title" : "Tweet Title",
		   "description" : "Description included in tweet",
		   "content" : {
		        "gallery" : {
		            "images" : ["https://www.image.com/1/"] // up to 4 images
		        },
		        "player"  : {
		            "embed"  : "https://www.youtube.com/embed/xtG-JbiH-Gc",
		            "image"  : "https://i.ytimg.com/vi/xtG-JbiH-Gc/mqdefault.jpg",
		            "width"  :  350,
		            "height" :  196
		        }
		    }
		});
			
		
		*/
		
		
		
		
		
		
		
		
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		let type = queryString("type");
		if (!type) {
			type = 0;
		}

		window.addEventListener("scroll", this.handleScroll.bind(this));
		window.NewNavTextAjaxDone = true;
		window.NewNavImgAjaxDone = true;
		window.NewNavVideoAjaxDone = true;

		document.title = "InWe-" + i18n.t("navMenu.news", this.props.lng);
		this.getNewsTextList(this.state.newsTextCur);
		this.getNewsImgList(this.state.newsImgCur);
		this.getNewsVideoList(this.state.newsVideoCur);
		let minH = getMainMinHeight();
		this.setState({
			minH: minH,
			activeIndex: 0,
			mounted: true,
			activeIndex: type
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
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
			pathName == "/news" &&
			this.state.mounted
		) {
			let curIndex = parseInt(this.state.activeIndex);
			if (isNaN(curIndex)) return;

			switch (curIndex) {
				case 0:
					var UlDom = document.getElementsByClassName(
						"textNewsUl"
					)[0];
					if (!UlDom) return;
					var liDom = UlDom.getElementsByTagName("li");
					//手机默认请求10条
					if (liDom.length < 10) return;
					var pageIndex = parseInt(liDom.length / 10) + 1;

					if (window.NewNavTextAjaxDone) {
						window.NewNavTextAjaxDone = false;
						this.props.getNewsTextM({
							type: 1,
							per_page: 10,
							page: pageIndex
						});
					}
					break;
				case 1:
					var UlDom = document.getElementsByClassName("imgNewsUl")[0];
					if (!UlDom) return;
					var liDom = UlDom.getElementsByTagName("li");
					//手机默认请求10条
					if (liDom.length < 10) return;
					var pageIndex = parseInt(liDom.length / 10) + 1;

					if (window.NewNavImgAjaxDone) {
						window.NewNavImgAjaxDone = false;
						this.props.getNewsImgM({
							type: 2,
							per_page: 10,
							page: pageIndex
						});
					}
					break;
				case 2:
					var UlDom = document.getElementsByClassName(
						"videoNewsUl"
					)[0];
					if (!UlDom) return;
					var liDom = UlDom.getElementsByTagName("li");
					//手机默认请求10条
					if (liDom.length < 10) return;
					var pageIndex = parseInt(liDom.length / 10) + 1;

					if (window.NewNavVideoAjaxDone) {
						window.NewNavVideoAjaxDone = false;
						this.props.getNewsVideoM({
							type: 3,
							per_page: 10,
							page: pageIndex
						});
					}
					break;
			}
		}
	}
	getNewsTextList(page) {
		let per_page = 4;
		if (IsTouchDevice) {
			per_page = 10;
		}
		this.props
			.getNewsText({
				type: 1,
				per_page: per_page,
				page: page
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
	getNewsImgList(page) {
		let per_page = 4;
		if (IsTouchDevice) {
			per_page = 10;
		}
		this.props
			.getNewsImg({
				type: 2,
				per_page: per_page,
				page: page
			})
			.then(res => {
				if (res.code === 4000) {
					return;
					this.setState({
						newsImgCur: res.data.current_page
					});
				}
			});
	}
	getNewsVideoList(page) {
		let per_page = 4;
		if (IsTouchDevice) {
			per_page = 10;
		}
		this.props
			.getNewsVideo({
				type: 3,
				per_page: per_page,
				page: page
			})
			.then(res => {
				if (res.code === 4000) {
					return;
					this.setState({
						newsVideoCur: res.data.current_page
					});
				}
			});
	}
	toggleNewsText(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsTextCur > 1) {
				let page = this.state.newsTextCur - 1;
				this.getNewsTextList(page);
			}
		} else if (val == "next") {
			if (this.state.newsTextCur < allPage) {
				let page = this.state.newsTextCur + 1;
				this.getNewsTextList(page);
			}
		}
	}
	toggleNewsImg(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsImgCur > 1) {
				let page = this.state.newsImgCur - 1;
				this.getNewsImgList(page);
			}
		} else if (val == "next") {
			if (this.state.newsImgCur < allPage) {
				let page = this.state.newsImgCur + 1;
				this.getNewsImgList(page);
			}
		}
	}
	toggleNewsVideo(val, allPage) {
		if (val == "prev") {
			// 上一页
			if (this.state.newsVideoCur > 1) {
				let page = this.state.newsVideoCur - 1;
				this.getNewsVideoList(page);
			}
		} else if (val == "next") {
			if (this.state.newsVideoCur < allPage) {
				let page = this.state.newsVideoCur + 1;
				this.getNewsVideoList(page);
			}
		}
	}

	render() {
		const settingsText = {
			infinite: false,
			arrows: false,
			speed: 500,
			touchMove: false,
			slidesToShow: 4,
			slidesToScroll: 0,
			afterChange: function(index) {
				this.setState({
					newsTextCur: index
				});
			}.bind(this)
		};
		const settingsImg = {
			infinite: false,
			arrows: false,
			speed: 500,
			touchMove: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			afterChange: function(index) {
				this.setState({
					newsImgCur: index
				});
			}.bind(this)
		};
		const settingsVideo = {
			infinite: false,
			arrows: false,
			speed: 500,
			touchMove: false,
			slidesToShow: 4,
			slidesToScroll: 4,
			afterChange: function(index) {
				this.setState({
					newsVideoCur: index
				});
			}.bind(this)
		};
		const {
			minH,
			liW,
			activeIndex,
			newsImgCur,
			newsTextCur,
			newsVideoCur
		} = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			newsText,
			newsImg,
			newsVideo,
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
							nofixed={true}
							commonMarket={commonMarket}
							getHeaderMarket={getHeaderMarket}
						/>
						<div id="mainBox" className="news ui">
							{/* <div className="left-menus ui center m-hide"> */}
							<LeftMenu lng={lng} />
							{/* </div> */}
							<div id="newsBox" className="newsBox ui f1">
								{IsTouchDevice && (
									<div
										id="m-nav"
										className="newsNav ui center "
									>
										<div id="m-nav-c" className="newsNav-c">
											{[
												"news",
												"ceefax",
												"videoTitle"
											].map((val, idx) => {
												return (
													<div
														className={
															activeIndex == idx
																? "item active"
																: "item"
														}
														key={idx}
													>
														<Link
															to={{
																pathname:
																	"news",
																search:
																	"?type=" +
																	idx
															}}
														>
															{t(
																"news." + val,
																lng
															)}
														</Link>
													</div>
												);
											})}
										</div>
									</div>
								)}
								<div
									className={
										IsTouchDevice
											? activeIndex == 0
												? "newsBoxMod"
												: "newsBoxMod m-hide"
											: "newsBoxMod"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												{t("news.news", lng)}
											</span>
											<Link
												to={{
													pathname: "/newslisttext"
												}}
											>
												<span className="nums readMoreUnderLine m-hide">
													read more
												</span>
											</Link>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span
											className={
												newsTextCur > 0
													? "leftArrow m-hide more"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.sliderText.slickPrev();
												// this.toggleNewsText(
												// 	"prev",
												// 	newsText.current_page
												// );
											}}
										/>
										{IsTouchDevice && (
											<ul className="ui textNewsUl">
												{newsText &&
													newsText.data &&
													newsText.data.length > 0 &&
													newsText.data.map(
														(item, index) => {
															return (
																<li
																	className="m-news-textNews"
																	key={index}
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
																			{
																				item.title
																			}
																		</p>
																		<div className="newsBoxModConDate">
																			<p className="">
																				{getLocalTime(
																					item.created_at
																				)}
																			</p>

																			{item.category && (
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
																	</Link>
																</li>
															);
														}
													)}
											</ul>
										)}
										{!IsTouchDevice && (
											<div className="ul ui textNewsUl">
												{newsText &&
													newsText.data &&
													newsText.data.length >
														0 && (
														<Slider
															ref={c =>
																(this.sliderText = c)
															}
															{...settingsText}
														>
															{newsText.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<div
																			className="li m-news-textNews"
																			key={
																				index
																			}
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
																					{
																						item.title
																					}
																				</p>
																				<div className="newsBoxModConDate">
																					<p className="">
																						{getLocalTime(
																							item.created_at
																						)}
																					</p>

																					{item.category && (
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
																			</Link>
																		</div>
																	);
																}
															)}
														</Slider>
													)}
											</div>
										)}
										<span
											className={
												newsTextCur + 4 <
												(newsText &&
													newsText.data &&
													newsText.data.length)
													? "rightArrow more m-hide"
													: "rightArrow m-hide"
											}
											onClick={() => {
												if (
													newsText &&
													newsText.data &&
													newsText.data.length > 4
												) {
													this.sliderText.slickNext();
												}
												// this.toggleNewsText(
												// 	"next",
												// 	newsText.last_page
												// );
											}}
										/>
									</div>
								</div>
								<div
									className={
										IsTouchDevice
											? activeIndex == 1
												? "newsBoxMod ceefax"
												: "newsBoxMod ceefax m-hide"
											: "newsBoxMod ceefax"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												{t("news.ceefax", lng)}
											</span>
											<Link
												to={{
													pathname: "/newslistimg",
													search: "?type=2"
												}}
											>
												<span className="nums readMoreUnderLine m-hide">
													read more
												</span>
											</Link>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span
											className={
												newsImgCur > 0
													? "leftArrow more m-hide"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.sliderImg.slickPrev();
												// this.toggleNewsImg(
												// 	"prev",
												// 	newsImg.current_page
												// );
											}}
										/>
										{!IsTouchDevice && (
											<div className="ul ui imgNewsUl">
												{newsImg &&
													newsImg.data &&
													newsImg.data.length > 0 && (
														<Slider
															ref={c =>
																(this.sliderImg = c)
															}
															{...settingsImg}
														>
															{newsImg.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<div
																			className="li m-news-imgNews"
																			key={
																				index
																			}
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
																				<div className="newsBoxModConShow">
																					<img
																						src={
																							item.img
																						}
																						alt=""
																					/>
																				</div>
																				<p className="desc">
																					{
																						item.title
																					}
																				</p>
																				<div className="newsBoxModConDate">
																					<p
																					>
																						{getLocalTime(
																							item.created_at
																						)}
																					</p>
																					{item.category && (
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
																			</Link>
																		</div>
																	);
																}
															)}
														</Slider>
													)}
											</div>
										)}
										{IsTouchDevice && (
											<ul className="ui imgNewsUl">
												{newsImg &&
													newsImg.data &&
													newsImg.data.length > 0 &&
													newsImg.data.map(
														(item, index) => {
															return (
																<li
																	className="m-news-imgNews"
																	key={index}
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
																			{
																				item.title
																			}
																		</p>
																		<div className="newsBoxModConDate">
																			<p>
																				{getLocalTime(
																					item.created_at
																				)}
																			</p>
																			{item.category && (
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
																				src={
																					item.img
																				}
																				alt=""
																			/>
																		</div>
																	</Link>
																</li>
															);
														}
													)}
											</ul>
										)}
										<span
											className={
												newsImgCur + 4 <
												(newsImg &&
													newsImg.data &&
													newsImg.data.length)
													? "rightArrow more m-hide"
													: "rightArrow m-hide"
											}
											onClick={() => {
												if (
													newsImg &&
													newsImg.data &&
													newsImg.data.length > 4
												) {
													this.sliderImg.slickNext();
												}
												// this.toggleNewsImg(
												// 	"next",
												// 	newsImg.last_page
												// );
											}}
										/>
									</div>
								</div>
								<div
									className={
										IsTouchDevice
											? activeIndex == 2
												? "newsBoxMod ceefax"
												: "newsBoxMod ceefax m-hide"
											: "newsBoxMod ceefax"
									}
								>
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												{t("news.videoTitle", lng)}
											</span>
											<Link
												to={{
													pathname: "/newslistimg",
													search: "?type=3"
												}}
											>
												<span className="nums readMoreUnderLine m-hide">
													read more
												</span>
											</Link>
										</p>
									</div>
									<div className="newsBoxModCon ui center ">
										<span
											className={
												newsVideoCur > 0
													? "leftArrow more m-hide"
													: "leftArrow m-hide"
											}
											onClick={() => {
												this.sliderVideo.slickPrev();
												// this.toggleNewsVideo(
												// 	"prev",
												// 	newsVideo.current_page
												// );
											}}
										/>
										{IsTouchDevice && (
											<ul className="ui videoNewsUl">
												{newsVideo &&
													newsVideo.data &&
													newsVideo.data.length > 0 &&
													newsVideo.data.map(
														(item, index) => {
															return (
																<li
																	className="m-news-videoNews"
																	key={index}
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
																			{
																				item.title
																			}
																		</p>

																		<div className="newsBoxModConDate m-hide">
																			<p>
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
																							item.category &&
																							item
																								.category
																								.img
																						}
																						alt=""
																					/>
																				)}
																		</div>
																		<div className="newsBoxModConShow">
																			{IsTouchDevice && (
																				<img
																					className="videoIcon"
																					src={
																						videoIcon
																					}
																				/>
																			)}
																			<img
																				className="cover"
																				src={
																					item.img
																				}
																				alt=""
																			/>
																		</div>
																		{IsTouchDevice && (
																			<div className="modDateText">
																				{getLocalTime(
																					item.created_at
																				)}
																			</div>
																		)}
																	</Link>
																</li>
															);
														}
													)}
											</ul>
										)}
										{!IsTouchDevice && (
											<div className="ul ui videoNewsUl">
												{newsVideo &&
													newsVideo.data &&
													newsVideo.data.length >
														0 && (
														<Slider
															ref={c =>
																(this.sliderVideo = c)
															}
															{...settingsVideo}
														>
															{newsVideo.data.map(
																(
																	item,
																	index
																) => {
																	return (
																		<div
																			className="li m-news-videoNews"
																			key={
																				index
																			}
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
																				<div className="newsBoxModConShow">
																					{IsTouchDevice && (
																						<img
																							className="videoIcon"
																							src={
																								videoIcon
																							}
																						/>
																					)}
																					<img
																						className="cover"
																						src={
																							item.img
																						}
																						alt=""
																					/>
																				</div>
																				<p className="desc">
																					{
																						item.title
																					}
																				</p>

																				<div className="newsBoxModConDate m-hide">
																					<p
																					>
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
																									item.category &&
																									item
																										.category
																										.img
																								}
																								alt=""
																							/>
																						)}
																				</div>
																				{IsTouchDevice && (
																					<div className="modDateText">
																						{getLocalTime(
																							item.created_at
																						)}
																					</div>
																				)}
																			</Link>
																		</div>
																	);
																}
															)}
														</Slider>
													)}
											</div>
										)}
										<span
											className={
												newsVideoCur + 4 <
												(newsVideo &&
													newsVideo.data &&
													newsVideo.data.length)
													? "rightArrow more m-hide"
													: "rightArrow m-hide"
											}
											onClick={() => {
												if (
													newsVideo &&
													newsVideo.data &&
													newsVideo.data.length > 4
												) {
													this.sliderVideo.slickNext();
												}
												// this.toggleNewsVideo(
												// 	"next",
												// 	newsVideo.last_page
												// );
											}}
										/>
									</div>
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
