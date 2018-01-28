import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import { I18n, Trans } from "react-i18next";
import { setLocalItem } from "../../utils/util";
import fixedbtn from "../../assets/images/fixedbtn.png";
import fixedbtn1 from "../../assets/images/fixedbtn1.png";
import Search from "../../components/search";
import "./index.less";
class FixedMenu extends PureComponent {
	constructor() {
		super();
		this.state = {
			isShow: false,
			showSearch: false
		};
	}
	componentDidMount() {
		setTimeout(() => {
			if (document.body.offsetWidth < 1280) {
				document.getElementsByTagName("body")[0].style.paddingLeft =
					"54px";
			}
		}, 0);
		document.addEventListener(
			"click",
			() => {
				this.setState({
					isShow: false
				});
			},
			false
		);
	}
	componentWillUnmount() {
		setTimeout(() => {
			document.getElementsByTagName("body")[0].style.paddingLeft = "0";
		}, 0);
	}
	setLanguageType(type) {
		return type === this.props.lng ? "language-btn cur" : "language-btn";
	}
	changeLanguage(type) {
		this.props.changeLng(type);
		window.i18n.changeLanguage(type);
		setLocalItem("language", type);
	}
	toggleType(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			isShow: !this.state.isShow
		});
	}
	setBoxClass() {
		return this.state.isShow ? "fixed-menu" : "fixed-menu hide";
	}
	closeSearch() {
		this.setState({
			showSearch: false
		});
	}
	openSearch() {
		this.setState({
			showSearch: true
		});
	}
	render() {
		const { lng } = this.props;
		const { isShow, showSearch } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="fixedBox">
						{showSearch && (
							<Search closeSearch={this.closeSearch.bind(this)} />
						)}
						<div className={(() => this.setBoxClass())()}>
							<div className="fixed-content">
								<div className="menu">
									<div className="search">
										<b
											className="searchBtn"
											onClick={() => {
												this.openSearch();
											}}
										/>
									</div>
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
									<span
										className="ui menuBtnCtrl"
										onClick={e => {
											this.toggleType(e);
										}}
									>
										<i className="icon-line" />
										<i className="icon-line" />
										<i className="icon-line" />
									</span>
								</div>
							</div>
							<div className="bottom-box">
								{isShow && (
									<div className="fixed-bottom">
										<div className="left">
											<a
												target="_blank"
												href="https://t.me/inwecrypto"
											>
												<i className="fixed-tele" />
											</a>
											<a href="mailto:support@inwecrypto.com">
												<i className="fixed-mail" />
											</a>
										</div>
										<div className="language">
											<span
												className={(() =>
													this.setLanguageType(
														"en"
													))()}
												onClick={() => {
													this.changeLanguage("en");
												}}
											>
												EN
											</span>
											<span
												className={(() =>
													this.setLanguageType(
														"zh"
													))()}
												onClick={() => {
													this.changeLanguage("zh");
												}}
											>
												ZH
											</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default FixedMenu;
