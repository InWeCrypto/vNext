import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { setLocalItem } from "../../utils/util";
import "./index.less";
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
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="footerBox" className="footer-box">
						<div className="container ui center">
							<div className="left">
								<span className="sp">@InWeCrypto 2017</span>
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
							<div className="f1" />
							<div className="right">
								<div
									className={(() =>
										this.setLanguageType("en"))()}
									onClick={() => {
										this.changeLanguage("en");
									}}
								>
									EN
								</div>
								<div
									className={(() =>
										this.setLanguageType("cn"))()}
									onClick={() => {
										this.changeLanguage("cn");
									}}
								>
									ZH
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default Footer;
