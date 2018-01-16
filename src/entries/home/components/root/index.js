import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import FixedMenu from "../../../../components/fixedmenu";
import TopText from "../toptext/";
import { getQuery } from "../../../../utils/util";
import "./index.less";
export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			AcImgH: "auto"
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
		let AcImgH = minH - th - 200;
		this.setState({
			AcImgH: AcImgH
		});
		console.log(AcImgH);
		document.getElementById("homeBoxArticleImg").style.maxHeight =
			AcImgH + "px";
	}
	componentDidUpdate() {}
	render() {
		const { lng, changeLng } = this.props;
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
									<p className="homeBoxArticleTitle">
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
								</div>
								<div className="homeBoxList homeBoxArticle">
									<p className="homeBoxArticleTitle">
										对菩提创始人林吓洪的专访
									</p>
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
