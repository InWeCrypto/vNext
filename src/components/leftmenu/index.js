import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class LeftMenuBox extends PureComponent {
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="left-menu">
						<div className="left-menu-item">
							<span className="line" />
							<span className="text">
								{t("leftMenu.home", lng)}
							</span>
						</div>
						<div className="left-menu-item">
							<span className="line" />
							<span className="text">
								{t("leftMenu.project", lng)}
							</span>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default LeftMenuBox;
