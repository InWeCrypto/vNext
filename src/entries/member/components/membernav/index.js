import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "./index.less";
class MemberNav extends PureComponent {
	setCur(type) {
		return type === this.props.cur ? "nav-item cur" : "nav-item";
	}
	render() {
		const { lng, cur } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="membernav-box">
						<Link
							to={{
								pathname: "/member",
								search: "?type=collection"
							}}
							className={(() => this.setCur("collection"))()}
						>
							{t("member.memberNav.project", lng)}
						</Link>
						<Link
							to={{
								pathname: "/member",
								search: "?type=news"
							}}
							className={(() => this.setCur("news"))()}
						>
							{t("member.memberNav.news", lng)}
						</Link>
						<Link
							to={{
								pathname: "/member",
								search: "?type=quotation"
							}}
							className={(() => this.setCur("quotation"))()}
						>
							{t("member.memberNav.market", lng)}
						</Link>
						<Link
							to={{
								pathname: "/member",
								search: "?type=set"
							}}
							className={(() => this.setCur("set"))()}
						>
							{t("member.memberNav.set", lng)}
						</Link>
						{/* <Link
							to={{
								pathname: "/member",
								search: "?type=message"
							}}
							className={(() => this.setCur("message"))()}
						>
							{t("member.memberNav.message", lng)}
						</Link> */}
					</div>
				)}
			</I18n>
		);
	}
}
export default MemberNav;
