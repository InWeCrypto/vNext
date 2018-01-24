import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { setLocalItem } from "../../utils/util";
import "./index.less";

import logofooter from "../../assets/images/footer_logo.png"
import enicon from "../../assets/images/enicon.png"
import cnicon from "../../assets/images/cnicon.png"
import loginImg from "../../assets/images/footer_login.png";
class Footer extends PureComponent {
	setLanguageType(type) {
		return type === this.props.lng ? "language-type cur" : "language-type";
	}
	changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
	}
	render() {
		console.log(this.props.lng);
		return <I18n>
				{(t, { I18n }) => <div id="footerBox" className="footer-box">
						{IsTouchDevice ? <div className="m-footer-container">
								<div className="top">
									<div className="iconContainer">
										<span className="item">
											<i className="icon-tele" />
										</span>
										<span className="item">
											<i className="icon-wechat" />
										</span>
										<span className="item">
											<i className="icon-mail" />
										</span>
									</div>
								</div>
								<div className="bottom ui center jcenter">
									<div className="logoInFooter">
										<img src={logofooter} alt="" />
									</div>
									<div className="line" />
									<div className={(() => this.setLanguageType("en"))()} onClick={() => {
											this.changeLanguage("en");
										}}>
										<img src={enicon} alt="" />
									</div>
									<div className="line" />
									<div className={(() => this.setLanguageType("zh"))()} onClick={() => {
											this.changeLanguage("zh");
										}}>
										<img src={cnicon} alt="" />
									</div>
									<div className="line" />
									<div className="loginIn">
										<img src={loginImg} alt="" />
									</div>
								</div>
							</div> : <div className="container ui center ">
								<div className="left">
									<span className="sp">
										@InWeCrypto 2017
									</span>
									<span className="item">
										<i className="icon-tele" />
									</span>
									<span className="item">
										<i className="icon-wechat" />
									</span>
									<span className="item">
										<i className="icon-mail" />
									</span>
								</div>
								<div className="f1 m-hide" />
								<div className="right">
									<div className={(() => this.setLanguageType("en"))()} onClick={() => {
											this.changeLanguage("en");
										}}>
										EN
									</div>
									<div className={(() => this.setLanguageType("zh"))()} onClick={() => {
											this.changeLanguage("zh");
										}}>
										ZH
									</div>
								</div>
							</div>}
					</div>}
			</I18n>;
	}
}
export default Footer;