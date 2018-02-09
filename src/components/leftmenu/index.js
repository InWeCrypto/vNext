import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, IndexLink } from "react-router-dom";
import Search from "../../components/search";
import "./index.less";
class LeftMenuBox extends PureComponent {
	constructor(props) {
		super(props);
		const newDate = new Date();
		this.state = { showSearch: false };
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
		const { showSearch } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="left-menus-news m-hide">
						{showSearch && (
							<Search closeSearch={this.closeSearch.bind(this)} />
						)}
						<div className="left-menu">
							<div className="search">
								<b
									className="searchBtn"
									onClick={() => {
										this.openSearch();
									}}
								/>
							</div>
							<NavLink
								exact
								to={{
									pathname: "/"
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.home", lng)}
								</span>
							</NavLink>
							<NavLink
								to={{
									pathname: "/projectlist",
									search: "?type="
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.project", lng)}
								</span>
							</NavLink>
							<NavLink
								to={{
									pathname: "/news"
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.news", lng)}
								</span>
							</NavLink>
							<NavLink
								to={{
									pathname: "/candybowl"
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.candybowl", lng)}
								</span>
							</NavLink>
							<NavLink
								to={{
									pathname: "/trading"
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.trading", lng)}
								</span>
							</NavLink>
							<NavLink
								to={{
									pathname: "/announcment"
								}}
								className="left-menu-item"
								activeClassName="cur"
							>
								<span className="line" />
								<span className="text">
									{t("navMenu.announcment", lng)}
								</span>
							</NavLink>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default LeftMenuBox;
