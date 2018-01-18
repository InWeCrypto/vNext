import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-Trading";
		this.props.getNews();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	render() {
		const { minH, liW } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser
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
						/>
						<div id="mainBox" className="news ui">
							<div className="left-menus ui center">
								<div className="left-menus-news">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="newsBox" className="newsBox ui f1">
								<div className="newsBoxMod">
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												24H News
											</span>
											<span className="nums">1/2</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span className="leftArrow" />
										<ul className="ui ">
											{[1, 2, 3, 4, 5].map(
												(item, index) => {
													return (
														<li key={index}>
															<p className="desc">
																纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案
															</p>
															<div className="newsBoxModConDate">
																<p>
																	2017-11-16
																	11:35:33
																</p>
																<img
																	src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515681385865&di=5470a46770b7e7a80ef72d15df368fd9&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172421_QKF4K.thumb.600_0.jpeg"
																	alt=""
																/>
															</div>
														</li>
													);
												}
											)}
										</ul>
										<span className="rightArrow more" />
									</div>
								</div>
								<div className="newsBoxMod ceefax">
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												图文资讯
											</span>
											<span className="nums">1/2</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span className="leftArrow" />
										<ul className="ui ">
											{[1, 2, 3, 4].map((item, index) => {
												return (
													<li key={index}>
														<p className="desc">
															纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案
														</p>
														<div className="newsBoxModConDate">
															<p>
																2017-11-16
																11:35:33
															</p>
															<img
																src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515681385865&di=5470a46770b7e7a80ef72d15df368fd9&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172421_QKF4K.thumb.600_0.jpeg"
																alt=""
															/>
														</div>
														<div className="newsBoxModConShow">
															<img
																src="http://pic22.nipic.com/20120707/9966610_095316099000_2.jpg"
																alt=""
															/>
														</div>
													</li>
												);
											})}
										</ul>
										<span className="rightArrow more" />
									</div>
								</div>

								<div className="newsBoxMod ceefax">
									<div className="newsBoxModTop">
										<p>
											<span className="title">
												图文资讯
											</span>
											<span className="nums">1/2</span>
										</p>
									</div>
									<div className="newsBoxModCon ui center">
										<span className="leftArrow" />
										<ul className="ui ">
											{[1, 2, 3, 4].map((item, index) => {
												return (
													<li key={index}>
														<p className="desc">
															纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案
														</p>
														<div className="newsBoxModConDate">
															<p>
																2017-11-16
																11:35:33
															</p>
															<img
																src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515681385865&di=5470a46770b7e7a80ef72d15df368fd9&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172421_QKF4K.thumb.600_0.jpeg"
																alt=""
															/>
														</div>
														<div className="newsBoxModConShow">
															<img
																src="http://pic22.nipic.com/20120707/9966610_095316099000_2.jpg"
																alt=""
															/>
														</div>
													</li>
												);
											})}
										</ul>
										<span className="rightArrow more" />
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
