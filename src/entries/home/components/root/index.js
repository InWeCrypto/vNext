import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import TopText from "../toptext/";
import { getQuery } from "../../../../utils/util";

import inweWallet from "../../../../assets/images/inwe_wallet.png";
import walletHold from "../../../../assets/images/walletHold.png";
import "./index.less";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		const newDate = new Date();
		this.state = {
			AcImgH: "auto",
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
					: newDate.getDate()
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
		}
	}
	componentDidMount() {
		document.title = "InWe-首页";
		let minH = getMainMinHeight();
		let th = document.querySelector("#topText").clientHeight;
		document.querySelector("#mainBox").style.minHeight = minH - th + "px";
		let AcImgH = minH - th - 320;
		this.setState({
			AcImgH: AcImgH
		});
		document.getElementById("homeBoxArticleImg").style.maxHeight =
			AcImgH + "px";
		this.setArticleList(1);
		this.setNewsList(1);
	}
	setArticleList(page) {
		this.props.getArticleList({
			type: "[2,3,4]",
			is_scroll: true,
			per_page: 1,
			page: page
		});
	}
	setNewsList(page) {
		this.props.getNewsList({
			type: "[1]",
			per_page: 5,
			page: page
		});
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
			newsList
		} = this.props;
		const { month, monthArr, curDay } = this.state;
		const curMonth = monthArr[month].slice(0, 3);
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
								<div className="homeBoxList ui homeBoxArticle">
									<p className="homeBoxTitle">
										{articleList.data &&
											articleList.data[0].title}
									</p>
									<div
										id="homeBoxArticleImg"
										className="homeBoxArticleImg"
									>
										<img
											src={
												articleList.data &&
												articleList.data[0].img
											}
											alt=""
										/>
									</div>
									<p className="homeBoxArticleDesc">
										{articleList.data &&
											articleList.data[0].desc}
									</p>
									<div className="homeBoxArticleBtn">
										{articleList.next_page_url && (
											<span
												className="more right ui center jcenter"
												onClick={() => {
													this.setArticleList(
														articleList.current_page +
															1
													);
												}}
											>
												<b />
											</span>
										)}
										{!articleList.next_page_url && (
											<span className="right ui center jcenter">
												<b />
											</span>
										)}
										{articleList.prev_page_url && (
											<span
												className="more left ui center jcenter"
												onClick={() => {
													this.setArticleList(
														articleList.current_page -
															1
													);
												}}
											>
												<b />
											</span>
										)}
										{!articleList.prev_page_url && (
											<span className="left ui center jcenter">
												<b />
											</span>
										)}
									</div>
								</div>
								<div className="homeBoxList homeBoxNews">
									<p className="homeBoxTitle">News</p>
									<ul className="homeBoxNewsUl">
										{newsList &&
											newsList.data &&
											newsList.data.length > 0 &&
											newsList.data.map((item, index) => {
												return (
													<li key={index}>
														<p>{item.title}</p>
													</li>
												);
											})}
									</ul>
									<div className="homeBoxReadMore">
										<Link
											to={{
												pathname: "/news"
											}}
										>
											<span className="readMore">
												Read more
											</span>
											<b className="readMoreImg" />
										</Link>
									</div>
								</div>
								<div className="homeBoxList homeBoxCandy">
									<p className="homeBoxTitle">Candy?</p>
									<div className="homeBoxCandyTop">
										<p className="homeCandyDate">
											<b>{curDay}</b>/{curMonth}
										</p>
										<span className="homeCandySpan">
											+NEO Airdrop
										</span>
										<span className="homeCandySpan">
											+NEO Airdrop
										</span>
									</div>
									{!IsTouchDevice && (
										<div>
											<div className="homeInweWallet">
												<img src={inweWallet} alt="" />
											</div>
											<div className="homeBoxReadMore">
												<span className="readMore">
													Read more
												</span>
												<b className="readMoreImg" />
											</div>
										</div>
									)}
								</div>
								<div className="homeBoxList homeBoxAnno">
									<p className="homeBoxTitle">交易所公告</p>
									<div className="homeBoxAnnoTop">
										<p className="homeBoxAnnoTopP">
											+火币：火币全球专业站12月27日14:00上线NEO…
										</p>
										<p className="homeBoxAnnoTopP">
											+火币：火币全球专业站12月27日14:00上线NEO…
										</p>
										<div className="homeBoxReadMore">
											<span className="readMore">
												Read more
											</span>
											<b className="readMoreImg" />
										</div>
									</div>
									{!IsTouchDevice && (
										<div className="homeBoxFllow">
											<p className="homeBoxTitle">
												Follow…
											</p>
											<ul className="homeBoxFllowUl">
												<li className="ui center jcenter">
													<img src="" alt="" />
													<span className="f1 ellitext">
														Ethereum
													</span>
												</li>
											</ul>
											<div className="homeBoxReadMore">
												<span className="readMore">
													Read more
												</span>
												<b className="readMoreImg" />
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
