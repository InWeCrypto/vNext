import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class MemberNav extends PureComponent {
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="membernav-box">
						<div className="nav-item">
							{t("member.memberNav.project", lng)}
						</div>
						<div className="nav-item">
							{t("member.memberNav.news", lng)}
						</div>
						<div className="nav-item">
							{t("member.memberNav.market", lng)}
						</div>
						<div className="nav-item cur">
							{t("member.memberNav.set", lng)}
						</div>
						<div className="nav-item">
							{t("member.memberNav.message", lng)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default MemberNav;
