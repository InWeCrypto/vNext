import React, { PureComponent } from "react";

import "./index.less";
class Footer extends PureComponent {
	render() {
		return (
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
						<div className="language-type">EN</div>
						<div className="language-type cur">ZH</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Footer;
