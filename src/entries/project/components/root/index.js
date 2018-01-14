import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {
		this.leftTwoMenusLinkTo(nextProps.location.search);
	}
	componentDidMount() {
		document.title = "InWe-Trading";
		this.props.getProject();
		let minH = getMainMinHeight();
		let liW =
			(document.querySelector("#projectContentRef").clientWidth - 187) /
			2;
		this.setState({
			minH: minH,
			liW: liW
		});
		document.querySelector("#mainBox").style.height = minH + "px";
		document.querySelector("#projectUlRef").style.width = liW * 4 + "px";

		this.leftTwoMenusLinkTo(this.props.location.search);
	}
	leftTwoMenusLinkTo(search) {
		let q = getQuery(search);
		this.state.leftTwoMenuCur = q.type || "";
	}
	listMove() {
		let showArrow = this.state.showArrow;
		if (showArrow == "right") {
			let marLeft = 2 * this.state.liW;
			document.querySelector("#projectUlRef").style.marginLeft =
				-marLeft + "px";
		} else if (showArrow == "left") {
			document.querySelector("#projectUlRef").style.marginLeft = 0 + "px";
		}
		this.setState({
			showArrow: showArrow == "left" ? "right" : "left"
		});
	}
	setLeftTwoMenuItemClass(type) {
		return this.state.leftTwoMenuCur == type
			? "leftTwoMenuItem cur"
			: "leftTwoMenuItem";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			showArrow: "right",
			liW: "auto",
			leftTwoMenuCur: ""
		};
	}
	render() {
		const { minH, showArrow, liW, leftTwoMenuCur } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header />
						<div id="mainBox" className="project ui">
							<div className="left-menus ui center">
								<LeftMenu lng={lng} />
							</div>
							<div className="leftTwoMenus ui center">
								<div className="leftTwoMenu">
									<Link
										to={{
											pathname: "/project",
											search: ""
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(""))()}
									>
										<span className="text">
											{t("project.trading", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=active"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"active"
											))()}
									>
										<span className="text">
											{t("project.active", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=upcoming"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"upcoming"
											))()}
									>
										<span className="text">
											{t("project.upcoming", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=ended"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"ended"
											))()}
									>
										<span className="text">
											{t("project.ended", lng)}
										</span>
									</Link>
								</div>
							</div>
							<div
								id="projectContentRef"
								className="projectContent ui f1"
							>
								<ul id="projectUlRef" className="ui">
									{[1, 2, 3, 4, 5, 6, 7, 8].map(
										(item, index) => {
											return (
												<li
													style={{
														height: minH / 2 + "px",
														width: liW
													}}
													key={index}
												>
													<div className="projectLiTop ui center">
														<div className="projectLiTopLeft ui center">
															<img src="" />
															<p>
																<span>NEO</span>
																<b>(neo)</b>
															</p>
														</div>
														<div
															className={
																index == 4
																	? "projectLiTopRight collect"
																	: "projectLiTopRight nocollect"
															}
														/>
													</div>
													<div className="projectLiType">
														<span className="ellitext">
															Blockchain
														</span>
													</div>
													<div className="projectLiDesc">
														<p className="ellitext">
															高盛将构建加密货币交易平台
														</p>
													</div>
													<div className="projectLiImg">
														<img src="" alt="" />
													</div>
													<div className="projectLiDate">
														2017-11-16 11:35:33
													</div>
												</li>
											);
										}
									)}
								</ul>
								<Link
									to={{
										pathname: "/projectlist"
									}}
									className="viewAllProject ui center"
								>
									<span>{t("project.more", lng)}</span>
								</Link>
								{showArrow == "left" && (
									<span
										className="projectSpanLeft"
										onClick={() => {
											this.listMove();
										}}
									/>
								)}
								{showArrow == "right" && (
									<span
										className="projectSpanRight"
										onClick={() => {
											this.listMove();
										}}
									/>
								)}
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}