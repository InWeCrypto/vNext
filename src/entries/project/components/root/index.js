import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			showArrow: "right",
			liW: "auto",
			leftTwoMenuCur: ""
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-Trading";
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

		this.initPage(this.props.location.search);
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			leftTwoMenuCur: q.type || "1"
		});
		this.props
			.getProject({
				type: q.type,
				per_page: 8
			})
			.then(res => {
				this.setState({
					showArrow: "left"
				});
				this.listMove();
			});
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
	projectCollect(e, c_id, enable) {
		e.preventDefault();
		this.props
			.getProjectCollect({
				c_id: c_id,
				enable: !enable
			})
			.then(res => {
				if (res.code === 4000) {
					// this.setState({
					// 	// enable: !this.state.enable
					// });
					// console.log(this.props);
				}
			});
	}
	render() {
		const { minH, showArrow, liW, leftTwoMenuCur } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			project
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
							nofixed={true}
						/>
						<div id="mainBox" className="project ui">
							<div className="left-menus ui center">
								<LeftMenu lng={lng} />
							</div>
							<div className="leftTwoMenus ui center">
								<div className="leftTwoMenu">
									<Link
										to={{
											pathname: "/project",
											search: "type=1"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"1"
											))()}
									>
										<span className="text">
											{t("project.trading", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=2"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"2"
											))()}
									>
										<span className="text">
											{t("project.active", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=3"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"3"
											))()}
									>
										<span className="text">
											{t("project.upcoming", lng)}
										</span>
									</Link>
									<Link
										to={{
											pathname: "/project",
											search: "?type=4"
										}}
										className={(() =>
											this.setLeftTwoMenuItemClass(
												"4"
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
									{project &&
										project.data &&
										project.data.length > 0 &&
										project.data.map((item, index) => {
											return (
												<li
													style={{
														height: minH / 2 + "px",
														width: liW
													}}
													key={index}
												>
													<Link
														to={{
															pathname:
																"projectdetail",
															search:
																"?c_id=" +
																item.id
														}}
													>
														<div className="projectLiTop ui center">
															<div className="projectLiTopLeft ui center">
																<img
																	src={
																		item.img
																	}
																/>
																<p>
																	<span>
																		{item.name.toLocaleUpperCase()}
																	</span>
																	<b>
																		({
																			item.long_name
																		})
																	</b>
																</p>
															</div>
															<div
																className={
																	item.category_user &&
																	item
																		.category_user
																		.is_favorite
																		? "projectLiTopRight collect"
																		: "projectLiTopRight nocollect"
																}
																onClick={e => {
																	let enable =
																		item.category_user &&
																		item
																			.category_user
																			.is_favorite
																			? true
																			: false;
																	this.projectCollect(
																		e,
																		item.id,
																		enable
																	);
																}}
															/>
														</div>
														<div className="projectLiType">
															<span className="ellitext">
																{item.industry}
															</span>
														</div>
														<div className="projectLiDesc">
															<p className="ellitext">
																{item.last_article &&
																	item
																		.last_article
																		.title}
															</p>
														</div>
														<div className="projectLiImg">
															<img
																src={
																	item.last_article &&
																	item
																		.last_article
																		.img
																}
																alt=""
															/>
														</div>
														<div className="projectLiDate">
															{item.last_article &&
																item
																	.last_article
																	.created_at}
														</div>
													</Link>
												</li>
											);
										})}
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
