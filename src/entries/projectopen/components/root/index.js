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
		setTimeout(() => {
			document.title =
				"InWe-" + i18n.t("navMenu.project", this.props.lng);
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
		}, 0);
	}
	componentDidUpdate() {}
	initPage(search) {
		let annoBoxH = document.getElementById("mainBox").clientHeight;
		let annoBoxLiH = 103;
		let nums = Math.floor((annoBoxH - 150) / annoBoxLiH) * 4;
		let q = getQuery(search);
		this.setState({
			type: q.type || "1",
			page: q.page || "1"
		});
		this.props
			.getProject({
				type: q.type,
				per_page: nums || 16,
				page: q.page
			})
			.then(res => {
				this.setState({});
			});
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
				}
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
			project,
			commonMarket,
			getHeaderMarket
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
							commonMarket={commonMarket}
							getHeaderMarket={getHeaderMarket}
						/>
						<div id="mainBox" className="projectOpen ui">
							{/* {project.last_page !== 1 && ( */}
							<div
								className={
									project.prev_page_url
										? "projectOpenLeft ui center show"
										: "projectOpenLeft ui center"
								}
							>
								{project.prev_page_url && (
									<Link
										to={{
											pathname: "/projectopen",
											search:
												"?type=" +
												type +
												"&&page=" +
												(project.current_page - 1)
										}}
									>
										<span />
									</Link>
								)}
								{!project.prev_page_url && <span />}
							</div>
							{/* )} */}
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
														<Link
															to={{
																pathname:
																	"projectdetail",
																search:
																	"?c_id=" +
																	item.id
															}}
														>
															<div className="projectOpenLiTop ui center">
																<div className="projectOpenLiTopLeft ui center">
																	<div
																		className={
																			item.category_user &&
																			item
																				.category_user
																				.is_favorite_dot
																				? "projectOpenImg newMsg"
																				: "projectOpenImg"
																		}
																	>
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
																		item.category_user &&
																		item
																			.category_user
																			.is_favorite
																			? "projectOpenLiTopRight collect"
																			: "projectOpenLiTopRight nocollect"
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
															<div className="projectOpenLiCenter">
																<div className="left">
																	{
																		item.industry
																	}
																</div>
																{type == 1 && (
																	<div className="right">
																		$90.00<span
																		>
																			(-12.00%)
																		</span>
																	</div>
																)}
															</div>
														</Link>
													</li>
												);
											})}
									</ul>
								</div>
							</div>
							{/* {project.last_page !== 1 && ( */}
							<div
								className={
									project.next_page_url
										? "projectOpenRight show ui center"
										: "projectOpenRight ui center"
								}
							>
								{project.next_page_url && (
									<Link
										to={{
											ppathname: "/projectopen",
											search:
												"?type=" +
												type +
												"&&page=" +
												(project.current_page + 1)
										}}
									>
										<span />
									</Link>
								)}
								{!project.next_page_url && <span />}
							</div>
							{/* )} */}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
