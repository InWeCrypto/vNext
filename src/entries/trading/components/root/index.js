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
			minH: "auto",
			liH: "auto",
			page: 1
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-Trading";

		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			page: q.page || "1"
		});
		this.props
			.getTrading({
				per_page: 6,
				page: q.page || 1
			})
			.then(res => {
				console.log(res);
			});
	}
	render() {
		const { minH, liH, page } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			trading
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
						<div id="mainBox" className="trading ui">
							<div className="left-menus ui center">
								<div className="left-menus-trading">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="tradingBox" className="tradingBox ui f1">
								<div className="annoBoxArrow ui center">
									{trading.prev_page_url && (
										<Link
											to={{
												pathname: "/trading",
												search:
													"?page=" +
													(trading.current_page - 1)
											}}
										>
											<span className="leftArrow more" />
										</Link>
									)}
									{!trading.prev_page_url && (
										<span className="leftArrow" />
									)}
								</div>

								<ul className="">
									{trading &&
										trading.data &&
										trading.data.length > 0 &&
										trading.data.map((item, index) => {
											return (
												<li
													className="ui"
													key={index}
													style={{ maxHeight: liH }}
												>
													<div className="tradingBoxImg">
														<img
															src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515681385865&di=5470a46770b7e7a80ef72d15df368fd9&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201312%2F05%2F20131205172421_QKF4K.thumb.600_0.jpeg"
															alt=""
														/>
													</div>
													<div className="tradingBoxCon">
														<p className="tradingBoxTitle ellitext">
															支撑拖住，等待上涨信号
														</p>
														<p className="desc">
															纽约州议员提出四项区块链技术相关法案纽约州议员提出四项区块链技术相关法案
														</p>
														<div className="tradingBoxModConDate">
															<p>
																2017-11-16
																11:35:33
															</p>
														</div>
													</div>
												</li>
											);
										})}
								</ul>
								<div className="annoBoxArrow ui center">
									{trading.next_page_url && (
										<Link
											to={{
												pathname: "/trading",
												search:
													"?page=" +
													(trading.current_page + 1)
											}}
										>
											<span className="rightArrow more" />
										</Link>
									)}
									{!trading.next_page_url && (
										<span className="rightArrow" />
									)}
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
