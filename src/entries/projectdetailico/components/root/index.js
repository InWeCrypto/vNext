import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";
import { platform } from "os";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-ICO";
		this.props.getProjectDetailIco();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	componentDidUpdate() {}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="projectDetail ui">
							<div className="projectDetailCon1">
								<div className="projectDetailConTop ui">
									<div className="projectDetailConTopLeft">
										<div className="projectDetailCenter1">
											<div className="projectDetailImg">
												<img src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1515589318224&amp;di=6418f077b77d7451a1246c6cfe793406&amp;imgtype=0&amp;src=http%3A%2F%2Fpic36.nipic.com%2F20131124%2F6608733_084856944000_2.jpg" />
											</div>
											<span>NEO</span>
											<p>Blockchain</p>
										</div>

										<div className="projectDetailCenter2">
											<span>Active</span>
											<p>
												Token Sale<i>ends in 4 DAYS</i>
											</p>
										</div>
									</div>
									<div className="projectDetailConTopRight">
										分享
									</div>
								</div>
								<div className="projectDetailCon1Box ui">
									<div className="projectDetailCon1BoxLeft">
										<div className="projectDetailCon1BoxLeftDate">
											<b />
											<p>12.22-01.02</p>
										</div>
										<ul>
											<li>Ticker: LOCICOIN</li>
											<li>Token type: ERC20 ICO</li>
											<li>
												Token Price: 1 LOCICOIN = 0.44
												USD
											</li>
											<li>
												Fundraising Goal: 19,000,000 USD
											</li>
											<li>
												Sold on pre-sale: 1,661,884 USD
											</li>
											<li>Total Tokens: 100,000,000</li>
											<li>
												Available for Token Sale: 50%
											</li>
											<li>
												Bonus for the First: 25%
												DISCOUNT
											</li>
											<li>
												Min/Max Personal Cap: 0.1 ETH /
												TBA
											</li>
											<li>Accepts: ETH</li>
										</ul>
									</div>
									<div className="projectDetailCon1BoxRight">
										<div className="projectDetailCon1BoxRightTit">
											ICO 结构
										</div>
										<ul>
											<li>
												<b />
												<span>25%用于团队建设</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="projectDetailCon2">
								<div className="projectDetailCon2Box">
									<div className="projectDetailCon2Title">
										Rank
									</div>
									<p>+关注热度：第1名</p>
									<p>+用户评分：4.5</p>
								</div>
								<div className="projectDetailCon2Box">
									<div className="projectDetailCon2Title">
										Explore
									</div>
									<p>+Neotracker.io</p>
									<p>+Neotracker.io</p>
								</div>
								<div className="projectDetailCon2Box">
									<div className="projectDetailCon2Title">
										Wallet
									</div>
									<p>+Im token</p>
								</div>
							</div>
							<div className="projectDetailCon3">
								<ul className="projectDetailCon3Ul">
									<li>
										<span>项目概况</span>
									</li>
									<li>
										<span>项目资讯</span>
									</li>
									<li>
										<span>项目介绍</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
