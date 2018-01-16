import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import TopText from "../toptext/";
import { getQuery } from "../../../../utils/util";

import inweWallet from "../../../../assets/images/inwe_wallet.png";

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
		this.props.getNewsList();
		let minH = getMainMinHeight();
		let th = document.querySelector("#topText").clientHeight;
		document.querySelector("#mainBox").style.minHeight = minH - th + "px";
		let AcImgH = minH - th - 320;
		this.setState({
			AcImgH: AcImgH
		});
		document.getElementById("homeBoxArticleImg").style.maxHeight =
			AcImgH + "px";
	}
	componentDidUpdate() {}
	render() {
		const { lng, changeLng } = this.props;
		const { month, monthArr, curDay } = this.state;
		const curMonth = monthArr[month].slice(0, 3);
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						{/* <FixedMenu changeLng={changeLng} lng={lng} /> */}
						<Header lng={lng} />
						<div id="topText" className="top-text">
							<TopText lng={lng} />
						</div>
						<div id="mainBox" className="main home ui">
							<div className="left-menus ui center">
								<div className="left-menu-home">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="homeBox" className="homeBox ui f1">
								<div className="homeBoxList ui homeBoxArticle">
									<p className="homeBoxTitle">
										对菩提创始人林吓洪的专访对菩提创始人林吓洪的专访
									</p>
									<div
										id="homeBoxArticleImg"
										className="homeBoxArticleImg"
									>
										<img
											src="https://b-ssl.duitang.com/uploads/item/201801/10/20180110212314_ytxcG.thumb.700_0.jpeg"
											alt=""
										/>
									</div>
									<p className="homeBoxArticleDesc">
										纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法…
									</p>
									<div className="homeBoxArticleBtn">
										<span className="more right ui center jcenter">
											<b />
										</span>
										<span className="left ui center jcenter">
											<b />
										</span>
									</div>
								</div>
								<div className="homeBoxList homeBoxNews">
									<p className="homeBoxTitle">News</p>
									<ul className="homeBoxNewsUl">
										{[1, 2, 3, 4].map((item, index) => {
											return (
												<li key={index}>
													<p>
														纽约州议员提出四项区块链
														技术相关法案
													</p>
												</li>
											);
										})}
									</ul>
									<div className="homeBoxReadMore">
										<span className="readMore">
											Read more
										</span>
										<b className="readMoreImg" />
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
									<div className="homeBoxFllow">
										<p className="homeBoxTitle">Follow…</p>
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
