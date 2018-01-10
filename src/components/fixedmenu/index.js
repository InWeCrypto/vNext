import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n, Trans } from "react-i18next";
import fixedbtn from "../../assets/images/fixedbtn.png";
import fixedbtn1 from "../../assets/images/fixedbtn1.png";
import "./index.less";
class FixedMenu extends PureComponent {
	constructor() {
		super();
		this.state = {
			isShow: false
		};
	}
	setLanguageType(type) {
		return type === this.props.lng ? "language-btn cur" : "language-btn";
	}
	changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
	}
	toggleType() {
		this.setState({
			isShow: !this.state.isShow
		});
	}
	setBoxClass() {
		return this.state.isShow ? "fixed-menu" : "fixed-menu hide";
	}
	render() {
		const { lng } = this.props;
		const { isShow } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className={(() => this.setBoxClass())()}>
						<div className="fixed-content">
							<div className="menu">
								<NavLink
									to={{
										pathname: "/"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.home", lng)}
									</span>
								</NavLink>
								<NavLink
									to={{
										pathname: "/project"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.project", lng)}
									</span>
								</NavLink>
								<NavLink
									to={{
										pathname: "/news"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.news", lng)}
									</span>
								</NavLink>
								<NavLink
									to={{
										pathname: "/candybowl"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.candybowl", lng)}
									</span>
								</NavLink>
								<NavLink
									to={{
										pathname: "/trading"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.trading", lng)}
									</span>
								</NavLink>
								<NavLink
									to={{
										pathname: "/announcment"
									}}
									className="nav-item"
									activeClassName="cur"
								>
									<span className="nav-text">
										{t("navMenu.announcment", lng)}
									</span>
								</NavLink>
							</div>

							<div className="ctrlbtn ui center">
								<span onClick={this.toggleType.bind(this)}>
									<i className="icon-more" />
								</span>
							</div>
						</div>
						<div className="bottom-box">
							{isShow && (
								<div className="fixed-bottom">
									<div className="left">1</div>
									<div className="language">
										<span
											className={(() =>
												this.setLanguageType("en"))()}
											onClick={() => {
												this.changeLanguage("en");
											}}
										>
											EN
										</span>
										<span
											className={(() =>
												this.setLanguageType("cn"))()}
											onClick={() => {
												this.changeLanguage("cn");
											}}
										>
											ZH
										</span>
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default FixedMenu;
