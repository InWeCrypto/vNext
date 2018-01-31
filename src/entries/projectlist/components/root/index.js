import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, queryString } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",

			mounted: false
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		let type = queryString("type");
		if (!type) {
			type = 1;
		}
		window.addEventListener("scroll", this.handleScroll.bind(this));
		window.NavFristAjaxDone = true;
		window.NavSecondAjaxDone = true;
		window.NavThirdAjaxDone = true;
		window.NavForthAjaxDone = true;

		this.setState({
			minH: "auto",
			mounted: true
		});
		setTimeout(() => {
			document.title =
				"InWe-" + i18n.t("navMenu.project", this.props.lng);
			let minH = getMainMinHeight();
			this.setState({
				minH: minH,
				activeInde: type
			});
			document.querySelector("#mainBox").style.minHeight = minH + "px";
			this.initPage();
		}, 0);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}
	componentDidUpdate() {}
	handleScroll() {
		if (!IsTouchDevice) return;
		let footerDom = document.getElementById("footerBox");
		let winHei = document.documentElement.clientHeight;
		if (!footerDom) return;
		let footerToTopHei = footerDom.getBoundingClientRect().bottom - 10;
		let pathName = location.pathname;
		let UlDom = document.getElementsByClassName("projectListConChildUl")[0];
		if (!UlDom) return;
		let liDom = UlDom.getElementsByTagName("li");
		if (liDom.length < 15) return;
		let pageIndex = parseInt(liDom.length / 15) + 1;
		if (
			footerToTopHei <= winHei &&
			pathName == "/projectlist" &&
			this.state.mounted
		) {
			let curIndex = parseInt(this.state.activeInde);
			if (isNaN(curIndex)) return;
			switch (curIndex) {
				case 1:
					if (window.NavFristAjaxDone) {
						window.NavFristAjaxDone = false;
						this.props.getProjectM({
							type: 1,
							per_page: 15,
							page: pageIndex
						});
					}
					break;
				case 2:
					if (window.NavSecondAjaxDone) {
						window.NavSecondAjaxDone = false;
						this.props.getProjectM2({
							type: 2,
							per_page: 15,
							page: pageIndex
						});
					}
					break;
				case 3:
					if (window.NavThridAjaxDone) {
						window.NavThridAjaxDone = false;
						this.props.getProjectM3({
							type: 3,
							per_page: 15,
							page: pageIndex
						});
					}
					break;
				case 4:
					if (window.NavForthAjaxDone) {
						window.NavForthAjaxDone = false;
						this.props.getProjectM4({
							type: 4,
							per_page: 15,
							page: pageIndex
						});
					}
					break;
			}
		}
	}
	initPage() {
		let annoBoxH = document.getElementById("mainBox").clientHeight;
		let annoBoxLiH = 103;
		let nums = Math.floor((annoBoxH - 150) / annoBoxLiH) || 4;
		// 默认条数4
		if (IsTouchDevice) {
			nums = 15;
		}
		this.props.getProject({
			type: 1,
			per_page: nums
		});
		this.props.getProject2({
			type: 2,
			per_page: nums
		});
		this.props.getProject3({
			type: 3,
			per_page: nums
		});
		this.props.getProject4({
			type: 4,
			per_page: nums
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
	chargeColor(val) {
		let intVal = parseInt(val);
		if (isNaN(intVal)) {
			return false;
		} else {
			if (val < 0) {
				return true;
			} else {
				return false;
			}
		}
	}
	render() {
		const { minH, activeInde } = this.state;
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
			project2,
			project3,
			project4,
			commonMarket,
			getHeaderMarket
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						{!IsTouchDevice && (
							<FixedMenu changeLng={changeLng} lng={lng} />
						)}
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
							nofixed={true}
							commonMarket={commonMarket}
							getHeaderMarket={getHeaderMarket}
						/>
						<div id="mainBox" className="projectList ui ">
							{/* <div className="projectListReturn ui center m-hide">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div> */}
							{IsTouchDevice && (
								<div
									id="m-nav"
									className="projectListNav ui center"
								>
									<div
										id="m-nav-c"
										className="projectListNav-c ui center"
									>
										<p
											className={
												activeInde == 1 ? "active" : ""
											}
										>
											<Link
												to={{
													pathname: "/projectlist",
													search: "type=1"
												}}
											>
												{t("project.trading", lng)}
											</Link>
										</p>
										<p
											className={
												activeInde == 2 ? "active" : ""
											}
										>
											<Link
												to={{
													pathname: "/projectlist",
													search: "type=2"
												}}
											>
												{t("project.active", lng)}
											</Link>
										</p>
										<p
											className={
												activeInde == 3 ? "active" : ""
											}
										>
											<Link
												to={{
													pathname: "/projectlist",
													search: "type=3"
												}}
											>
												{t("project.upcoming", lng)}
											</Link>
										</p>
										<p
											className={
												activeInde == 4 ? "active" : ""
											}
										>
											<Link
												to={{
													pathname: "/projectlist",
													search: "type=4"
												}}
											>
												{t("project.ended", lng)}
											</Link>
										</p>
									</div>
								</div>
							)}
							<div className="projectListCon ui">
								{[1, 2, 3, 4].map((item, index) => {
									if (
										IsTouchDevice &&
										activeInde != index + 1
									) {
										return null;
									}
									return (
										<div
											key={index}
											className="projectListConChild"
										>
											<div className="projectListConChildTitle m-hide">
												<span className="ellitext">
													{(() => {
														switch (index) {
															case 0:
																return t(
																	"project.trading",
																	lng
																);
																break;
															case 1:
																return t(
																	"project.active",
																	lng
																);
																break;
															case 2:
																return t(
																	"project.upcoming",
																	lng
																);
																break;
															case 3:
																return t(
																	"project.ended",
																	lng
																);
																break;
														}
													})()}
												</span>
											</div>
											<ul className="projectListConChildUl">
												{index == 0 &&
													project &&
													project.data &&
													project.data.length > 0 &&
													project.data.map(
														(item, index) => {
															return (
																<li key={index}>
																	<Link
																		to={{
																			pathname:
																				"projectdetail",
																			search:
																				"?c_id=" +
																				item.id
																		}}
																	>
																		<div className="projectListLiTop ui center">
																			<div className="projectListLiTopLeft ui center">
																				<div
																					className={
																						item.category_user &&
																						item
																							.category_user
																							.is_favorite_dot
																							? "projectListImg newMsg"
																							: "projectListImg"
																					}
																				>
																					<img
																						src={
																							item.img
																						}
																					/>
																				</div>
																				<p
																				>
																					<span className="ellitext">
																						{
																							item.unit
																						}
																						{IsTouchDevice && (
																							<span className="industryText">
																								{
																									item.industry
																								}
																							</span>
																						)}
																					</span>
																					<b className="ellitext">
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
																						? "projectListLiTopRight collect m-hide"
																						: "projectListLiTopRight nocollect m-hide"
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
																		<div className="projectListLiCenter">
																			<div className="left m-hide">
																				{
																					item.industry
																				}
																			</div>
																			{item.ico && (
																				<div
																					className={
																						item
																							.ico
																							.percent_change_24h <
																						0
																							? "right m-hide down"
																							: "right m-hide"
																					}
																				>
																					${
																						item
																							.ico
																							.price_usd
																					}
																					<span
																					>
																						({
																							item
																								.ico
																								.percent_change_24h
																						}%)
																					</span>
																				</div>
																			)}
																			{IsTouchDevice && (
																				<div
																					className={
																						item.ico
																							? ""
																							: "m-hide"
																					}
																				>
																					<div
																						className={
																							item.ico &&
																							item
																								.ico
																								.price_usd
																								? "money"
																								: "money m-hide"
																						}
																					>
																						${item.ico &&
																							item
																								.ico
																								.price_usd &&
																							parseFloat(
																								item
																									.ico
																									.price_usd
																							).toFixed(
																								2
																							)}
																					</div>
																					<div
																						className={
																							this.chargeColor(
																								item
																									.ico
																									.percent_change_24h
																							)
																								? "precents colorRed"
																								: "precents"
																						}
																					>
																						({item
																							.ico
																							.percent_change_24h >=
																							0 &&
																							"+"}
																						{item.ico &&
																							item
																								.ico
																								.percent_change_24h}%)
																					</div>
																				</div>
																			)}
																		</div>
																	</Link>
																</li>
															);
														}
													)}
												{index == 1 &&
													project2 &&
													project2.data &&
													project2.data.length > 0 &&
													project2.data.map(
														(item, index) => {
															return (
																<li key={index}>
																	<Link
																		to={{
																			pathname:
																				"projectdetail",
																			search:
																				"?c_id=" +
																				item.id
																		}}
																	>
																		<div className="projectListLiTop ui center">
																			<div className="projectListLiTopLeft ui center">
																				<div
																					className={
																						item.category_user &&
																						item
																							.category_user
																							.is_favorite_dot
																							? "projectListImg newMsg"
																							: "projectListImg"
																					}
																				>
																					<img
																						src={
																							item.img
																						}
																					/>
																				</div>
																				<p
																				>
																					<span className="ellitext">
																						{
																							item.unit
																						}
																						{IsTouchDevice && (
																							<span className="industryText">
																								{
																									item.industry
																								}
																							</span>
																						)}
																					</span>
																					<b className="ellitext">
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
																						? "projectListLiTopRight collect  m-hide"
																						: "projectListLiTopRight nocollect  m-hide"
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
																		<div className="projectListLiCenter">
																			<div className="left m-hide">
																				{
																					item.industry
																				}
																			</div>
																		</div>
																	</Link>
																</li>
															);
														}
													)}
												{index == 2 &&
													project3 &&
													project3.data &&
													project3.data.length > 0 &&
													project3.data.map(
														(item, index) => {
															return (
																<li key={index}>
																	<Link
																		to={{
																			pathname:
																				"projectdetail",
																			search:
																				"?c_id=" +
																				item.id
																		}}
																	>
																		<div className="projectListLiTop ui center">
																			<div className="projectListLiTopLeft ui center">
																				<div
																					className={
																						item.category_user &&
																						item
																							.category_user
																							.is_favorite_dot
																							? "projectListImg newMsg"
																							: "projectListImg"
																					}
																				>
																					<img
																						src={
																							item.img
																						}
																					/>
																				</div>
																				<p
																				>
																					<span className="ellitext">
																						{
																							item.unit
																						}
																						{IsTouchDevice && (
																							<span className="industryText">
																								{
																									item.industry
																								}
																							</span>
																						)}
																					</span>
																					<b className="ellitext">
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
																						? "projectListLiTopRight collect m-hide"
																						: "projectListLiTopRight nocollect m-hide"
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
																		<div className="projectListLiCenter">
																			<div className="left m-hide">
																				{
																					item.industry
																				}
																			</div>
																		</div>
																	</Link>
																</li>
															);
														}
													)}
												{index == 3 &&
													project4 &&
													project4.data &&
													project4.data.length > 0 &&
													project4.data.map(
														(item, index) => {
															return (
																<li key={index}>
																	<Link
																		to={{
																			pathname:
																				"projectdetail",
																			search:
																				"?c_id=" +
																				item.id
																		}}
																	>
																		<div className="projectListLiTop ui center">
																			<div className="projectListLiTopLeft ui center">
																				<div
																					className={
																						item.category_user &&
																						item
																							.category_user
																							.is_favorite_dot
																							? "projectListImg newMsg"
																							: "projectListImg"
																					}
																				>
																					<img
																						src={
																							item.img
																						}
																					/>
																				</div>
																				<p
																				>
																					<span className="ellitext">
																						{
																							item.unit
																						}
																					</span>
																					<b className="ellitext">
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
																						? "projectListLiTopRight collect m-hide"
																						: "projectListLiTopRight nocollect m-hide"
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
																		<div className="projectListLiCenter">
																			<div className="left">
																				{
																					item.industry
																				}
																			</div>
																		</div>
																	</Link>
																</li>
															);
														}
													)}
											</ul>
											{index == 0 &&
												!(
													project &&
													project.data &&
													project.data.length > 0
												) &&
												IsTouchDevice && (
													<div
														className={
															IsTouchDevice
																? "nodata-box Center"
																: "nodata-box"
														}
													>
														{t("nodata", lng)}
													</div>
												)}
											{index == 1 &&
												!(
													project2 &&
													project2.data &&
													project2.data.length > 0
												) &&
												IsTouchDevice && (
													<div
														className={
															IsTouchDevice
																? "nodata-box Center"
																: "nodata-box"
														}
													>
														{t("nodata", lng)}
													</div>
												)}
											{index == 2 &&
												!(
													project3 &&
													project3.data &&
													project3.data.length > 0
												) &&
												IsTouchDevice && (
													<div
														className={
															IsTouchDevice
																? "nodata-box Center"
																: "nodata-box"
														}
													>
														{t("nodata", lng)}
													</div>
												)}
											{index == 3 &&
												!(
													project4 &&
													project4.data &&
													project4.data.length > 0
												) &&
												IsTouchDevice && (
													<div
														className={
															IsTouchDevice
																? "nodata-box Center"
																: "nodata-box"
														}
													>
														{t("nodata", lng)}
													</div>
												)}
											<div className="projectListConChildMore m-hide">
												<Link
													to={{
														pathname:
															"/projectopen",
														search:
															"?type=" +
															(index + 1) +
															"&&page=1"
													}}
												>
													{index == 0 &&
														project.total -
															project.to !=
															0 && (
															<span className="ellitext">
																{t(
																	"project.other",
																	lng
																)}
																{project.total -
																	project.to}
																{t(
																	"project.otherend",
																	lng
																)}
															</span>
														)}
													{index == 1 &&
														project2.total -
															project2.to !=
															0 && (
															<span className="ellitext">
																{t(
																	"project.other",
																	lng
																)}
																{project2.total -
																	project2.to}
																{t(
																	"project.otherend",
																	lng
																)}
															</span>
														)}
													{index == 2 &&
														project3.total -
															project3.to !=
															0 && (
															<span className="ellitext">
																{t(
																	"project.other",
																	lng
																)}
																{project3.total -
																	project3.to}
																{t(
																	"project.otherend",
																	lng
																)}
															</span>
														)}
													{index == 3 &&
														project4.total -
															project4.to !=
															0 && (
															<span className="ellitext">
																{t(
																	"project.other",
																	lng
																)}
																{project4.total -
																	project4.to}
																{t(
																	"project.otherend",
																	lng
																)}
															</span>
														)}
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						{IsTouchDevice && <div id="footerBox" />}
					</div>
				)}
			</I18n>
		);
	}
}
