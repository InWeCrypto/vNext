import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

import wallent_phone from "../../../../assets/images/wallet_iPhone.png";
import app_store from "../../../../assets/images/app_store.png";
import google_play from "../../../../assets/images/google_play.png";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto"
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
		q.k = window.decodeURI(q.k);
		this.setState({
			k: q.k || ""
		});
	}
	render() {
		const { minH, liH } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			commonMarket,
			getHeaderMarket
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
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
						<div
							id="mainBox"
							className="wallentBox ui center jcenter"
						>
							<div className="wallentLf f1">
								<span className="wallentLfTitle ellitext">
									InWeCrypto Wallet
								</span>
								<p className="wallentLfCont">
									InWeCrypto is a multi-asset wallet that
									supports BTC, ETH, NEO, as well as all ERC20
									tokens and NEP5 tokens. It boasts
									multi-asset management, which is
									intelligent,efficient and easy to process.
									It also integrates information of InWeCrypto
									website and has the advantage of media
									information and secure storage of digital
									assets.
								</p>
								<div className="wallentDown">
									<div className="downLf">
										<img src={app_store} alt="" />
									</div>
									<div className="downRt">
										<img src={google_play} alt="" />
									</div>
								</div>
							</div>
							<div className="wallentRt">
								<img src={wallent_phone} alt="" />
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
