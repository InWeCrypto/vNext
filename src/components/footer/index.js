import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { setLocalItem, chargeFooterFixed } from "../../utils/util";
import "./index.less";

import TurnApp from "../turnapp";

import logofooter from "../../assets/images/footer_logo.png";
import enicon from "../../assets/images/enicon.png";
import cnicon from "../../assets/images/cnicon.png";
import loginImg from "../../assets/images/footer_login.png";
class Footer extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			footerFixed: false
		};
	}
	componentDidMount() {
		if (IsTouchDevice) {
			chargeFooterFixed();
		}
	}
	componentDidUpdate() {
		if (IsTouchDevice) {
			chargeFooterFixed();
		}
	}

	setLanguageType(type) {
		return type === this.props.lng ? "language-type cur" : "language-type";
	}
	changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
	}
	toHomeInwe() {
		window.location.href = "https://t.me/inwecrypto";
	}
	toMail() {
		window.location = "mailto:support@inwecrypto.com";
	}
	showApp() {
		let trunapp = window.CtrunappAdvHide;
		if (trunapp && IsTouchDevice) {
			trunapp.setState({
				advHide: false
			});
		}
	}
	render() {
		const { footerFixed } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div
						id="footerBox"
						className={
							footerFixed ? "footer-box fixed" : "footer-box"
						}
					>
						{IsTouchDevice && (
							<div className="m-footer-container">
								<div className="top">
									<div className="iconContainer">
										<span
											className="item"
											onClick={this.toHomeInwe.bind(this)}
										>
											<i className="icon-tele" />
										</span>
										<span
											className="item"
											onClick={this.toMail.bind(this)}
										>
											<i className="icon-mail" />
										</span>
									</div>
								</div>
								<div className="bottom ui center jcenter">
									<div className="logoInFooter">
										@InWeCrypto 2017
									</div>
									<div className="line" />
									<div
										className={(() =>
											this.setLanguageType("en"))()}
										onClick={() => {
											this.changeLanguage("en");
										}}
									>
										EN
									</div>
									<div className="line" />
									<div
										className={(() =>
											this.setLanguageType("zh"))()}
										onClick={() => {
											this.changeLanguage("zh");
										}}
									>
										CN
									</div>
									<div className="line" />
									<div
										className="loginIn"
										onClick={this.showApp.bind(this)}
									>
										Login sign up
									</div>
								</div>
								<TurnApp />
							</div>
						)}
						{!IsTouchDevice && <div className="footer-hold" />}
						{!IsTouchDevice && (
							<div className="footerSeat">
								<div className="container ui center ">
									<div className="left">
										<span className="sp">
											@InWeCrypto 2017
										</span>
										<a
											target="_blank"
											href="https://t.me/inwecrypto"
											className="item"
										>
											<i className="icon-tele" />
										</a>
										{/* <span className="item">
										<i className="icon-wechat" />
									</span> */}
										<a
											href="mailto:support@inwecrypto.com"
											className="item"
										>
											<i className="icon-mail" />
										</a>
									</div>
									<div className="f1 m-hide" />
									<div className="right">
										<div
											className={(() =>
												this.setLanguageType("en"))()}
											onClick={() => {
												this.changeLanguage("en");
											}}
										>
											<div>EN</div>
											<span className="line" />
										</div>
										<div
											className={(() =>
												this.setLanguageType("zh"))()}
											onClick={() => {
												this.changeLanguage("zh");
											}}
										>
											<div>ZH</div>
											<span className="line" />
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
export default Footer;
