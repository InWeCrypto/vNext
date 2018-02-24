import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import {
	getMainMinHeight,
	getQuery,
	getDownloadSit,
	isAndroidOrIos,
	openInstallApp
} from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

import wallent_phone from "../../../../assets/images/wallet_iPhone.png";
import app_store from "../../../../assets/images/app_store.png";
import google_play from "../../../../assets/images/google_play.png";
import androidqrcode from "../../../../assets/images/androidqrcode.png";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			showDownLoadPop: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.wallent", this.props.lng);

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
	downLoadAndroidApp() {
		if (IsTouchDevice) {
			openInstallApp();
			//window.location.href = getDownloadSit();
		} else {
			this.setState({
				showDownLoadPop: true
			});
		}
	}
	closePopQrcode() {
		this.setState({
			showDownLoadPop: false
		});
	}
	render() {
		const { minH, liH, showDownLoadPop } = this.state;
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
						{!IsTouchDevice && (
							<FixedMenu changeLng={changeLng} lng={lng} />
						)}
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
								<span className="wallentLfTitle ellitext ">
									InWeCrypto Wallet
								</span>
								<p className="wallentLfCont">
									{t("wallent", lng)}
								</p>
								<div className="wallentDown">
									{(isAndroidOrIos() == "ios" ||
										!IsTouchDevice) && (
										<div className="downLf">
											<img src={app_store} alt="" />
										</div>
									)}
									{(isAndroidOrIos() == "android" ||
										!IsTouchDevice) && (
										<div
											className="downRt"
											onClick={this.downLoadAndroidApp.bind(
												this
											)}
										>
											<img src={google_play} alt="" />
										</div>
									)}
								</div>
							</div>
							<div className="wallentRt m-hide">
								<img src={wallent_phone} alt="" />
							</div>
						</div>
						{showDownLoadPop && (
							<div className="downloadPopup">
								<div className="centerBox Center">
									<div className="title">InWeCrypto</div>
									<div
										className="closeBtn"
										onClick={this.closePopQrcode.bind(this)}
									/>

									<div className="qrcodeMess Center">
										<img src={androidqrcode} alt="" />
									</div>
								</div>
							</div>
						)}

						{/* <Footer changeLng={changeLng} lng={lng} /> */}
					</div>
				)}
			</I18n>
		);
	}
}
