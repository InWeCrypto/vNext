import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liW: "auto",
			liH: "auto",
			liMR: "auto",
			type: 1,
			page: 1
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-项目列表";
		let minH = getMainMinHeight();
		let U = (uiW = document.getElementById("projectOpenConChildUl")
			.clientWidth);
		let liW = parseInt(uiW * 0.22);
		let liMR = parseInt(uiW * 0.04);
		let liH = parseInt((minH - 160) / 6);
		this.setState({
			minH: minH,
			liW: liW,
			liH: liH,
			liMR: liMR
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	componentDidUpdate() {}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			type: q.type || "1",
			page: q.page || "1"
		});
		this.props
			.getProject({
				type: q.type,
				per_page: 2,
				page: q.page
			})
			.then(res => {
				this.setState({});
			});
	}
	render() {
		const { minH, liW, liH, liMR, type, page } = this.state;
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
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
						/>
						<div id="mainBox" className="projectOpen ui">
							<div
								className={
									project.article_prev
										? "projectOpenLeft ui center show"
										: "projectOpenLeft ui center"
								}
							>
								{project.article_prev && (
									<Link
										to={{
											pathname: "/projectopen",
											search:
												"?type=" +
												type +
												"&&page=" +
												(page - 1)
										}}
									>
										<span />
									</Link>
								)}
								{!project.article_prev && <span />}
							</div>
							<div className="projectOpenCon ui">
								<div className="projectOpenConChild">
									<div className="projectOpenConChildTitle">
										<span className="ellitext">
											{type == 1 &&
												t("project.trading", lng)}
											{type == 2 &&
												t("project.active", lng)}
											{type == 3 &&
												t("project.upcoming", lng)}
											{type == 4 &&
												t("project.ended", lng)}
										</span>
									</div>
									<ul
										id="projectOpenConChildUl"
										className="projectOpenConChildUl"
									>
										{project &&
											project.data &&
											project.data.length > 0 &&
											project.data.map((item, index) => {
												return (
													<li
														key={index}
														style={{
															width: liW,
															height: liH,
															marginRight: liMR
														}}
													>
														<div className="projectOpenLiTop ui center">
															<div className="projectOpenLiTopLeft ui center">
																<div className="projectOpenImg newMsg">
																	<img
																		src={
																			item.img
																		}
																	/>
																</div>
																<p>
																	<span className="ellitext">
																		{
																			item.name
																		}
																	</span>
																	<b className="ellitext">
																		{
																			item.long_name
																		}
																	</b>
																</p>
															</div>
															<div
																className={
																	item.category_user
																		? "projectOpenLiTopRight collect"
																		: "projectOpenLiTopRight nocollect"
																}
																onClick={() => {
																	let enable = item.category_user
																		? true
																		: false;
																	this.projectCollect(
																		item.id,
																		enable
																	);
																}}
															/>
														</div>
														<div className="projectOpenLiCenter">
															<div className="left">
																{item.industry}
															</div>
															{type == 1 && (
																<div className="right">
																	$90.00<span>
																		(-12.00%)
																	</span>
																</div>
															)}
														</div>
													</li>
												);
											})}
									</ul>
								</div>
							</div>
							<div
								className={
									project.article_next
										? "projectOpenRight show ui center"
										: "projectOpenRight ui center"
								}
							>
								{project.article_next && (
									<Link
										to={{
											ppathname: "/projectopen",
											search:
												"?type=" +
												type +
												"&&page=" +
												(page - 1)
										}}
									>
										<span />
									</Link>
								)}
								{!project.article_next && <span />}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
