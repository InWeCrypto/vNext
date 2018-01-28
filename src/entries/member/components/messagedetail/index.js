import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class MessageDetail extends PureComponent {
	render() {
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="messaged-box">
						<div className="messaged-bg" />
						<div className="messaged-cont">
							<div className="messaged-container">
								<i className="icon-close" />
								<div className="messaged-title">2sadasd</div>
								<div className="messaged-time">
									2018-11-11 11:11:11
								</div>
								<div className="messaged-detail">
									dsadsadas<br />
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default MessageDetail;
