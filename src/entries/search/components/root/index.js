import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import {
	getMainMinHeight,
	getQuery,
	getLocalTime
} from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			inputBg: false,
			k: "",
			type: "",
			isEnter: ""
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.search", this.props.lng);

		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		window.onkeydown = function(event) {
			event = event || window.event;
			if (event.keyCode == 13) {
				if (this.state.inputBg) {
					if (this.state.type == 2) {
						window.location.href =
							"/search?type=2&k=" + this.state.k;
					} else {
						window.location.href = "/search?k=" + this.state.k;
					}
				}
			}
		}.bind(this);
		this.initPage(this.props.location.search);
	}
	initPage(search) {
		let q = getQuery(search);
		q.k = window.decodeURI(q.k);
		this.setState({
			k: q.k || "",
			isEnter: q.k || "",
			type: q.type
		});
		if (q.type == 2) {
			// 搜索项目
			this.props.getSearchPro({
				keyword: q.k
			});
		} else {
			this.props.getSearch({
				k: q.k
			});
		}
	}
	render() {
		const { minH, liH, page, inputBg, k, type, isEnter } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			search,
			searchPro,
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
							commonMarket={commonMarket}
							getHeaderMarket={getHeaderMarket}
						/>
						<div id="mainBox" className="searchBox">
							<div
								className={
									inputBg
										? "searchInput ui center jcenter focus"
										: "searchInput ui center jcenter"
								}
							>
								<b />
								<input
									type="text"
									placeholder={t("search.placeholder", lng)}
									value={k}
									onChange={e => {
										this.setState({
											k: e.target.value
										});
									}}
									onFocus={e => {
										this.setState({
											inputBg: true
										});
									}}
									onBlur={() => {
										this.setState({
											inputBg: false
										});
									}}
								/>
							</div>

							<div className="searchResult">
								{IsTouchDevice && !isEnter ? (
									<div className="letSearch">
										<p className="title">
											Everyone in the search
										</p>
										<p className="linkList ui center">
											<Link to="/search?k=Neo">Neo</Link>
											<Link to="/search?k=Btc">Btc</Link>
											<Link to="/search?k=Ltd">Ltd</Link>
										</p>
									</div>
								) : (
									<ul
										className={
											type == 2
												? "searchResultUl searchProResultUl"
												: "searchResultUl"
										}
									>
										{type == 2 &&
											searchPro &&
											searchPro.data &&
											searchPro.data.length > 0 &&
											searchPro.data.map(
												(item, index) => {
													return (
														<li
															key={index}
															style={{
																width: "25%"
																// height: liH,
																// marginRight: liMR
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
																{!IsTouchDevice && (
																	<div className="projectOpenLiIndu">
																		{
																			item.industry
																		}
																	</div>
																)}
																{type == 1 && (
																	<div className="projectOpenLiCenter">
																		<div className="left m-hide">
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
																		{item.ico && (
																			<div
																				className={
																					item
																						.ico
																						.percent_change_24h <
																					0
																						? "right m-hide downs"
																						: "right m-hide"
																				}
																			>
																				<span
																				>
																					{
																						item
																							.ico
																							.percent_change_24h
																					}%
																				</span>
																			</div>
																		)}
																	</div>
																)}
															</Link>
														</li>
													);
												}
											)}
										{type != 2 &&
											search &&
											search.data &&
											search.data.length > 0 &&
											search.data.map((item, index) => {
												return (
													<li
														key={index}
														className={
															IsTouchDevice &&
															item.img
																? "ui m-withImg"
																: "ui"
														}
													>
														<Link
															className="ui m-block"
															to={{
																pathname:
																	"/newsdetail",
																search:
																	"?art_id=" +
																	item.id
															}}
														>
															{item.img && (
																<div className="imgLf">
																	<img
																		src={
																			item.img
																		}
																		alt=""
																	/>
																</div>
															)}
															<div className="conRt f1">
																{IsTouchDevice ? (
																	<p className="text">
																		{
																			item.title
																		}
																		{":"}
																		{
																			item.desc
																		}
																	</p>
																) : (
																	<div>
																		<span className="conRtTitle">
																			{
																				item.title
																			}
																		</span>
																		<p className="conRtDesc ellitext">
																			{
																				item.desc
																			}
																		</p>
																	</div>
																)}
															</div>
															{IsTouchDevice && (
																<div className="conDate">
																	<span className="date">
																		{getLocalTime(
																			item.created_at
																		)}
																	</span>
																	{item.img && (
																		<span className="original">
																			{t(
																				"icon.original",
																				lng
																			)}
																		</span>
																	)}
																</div>
															)}
														</Link>
													</li>
												);
											})}
									</ul>
								)}
							</div>
						</div>
						{/* <Footer changeLng={changeLng} lng={lng} /> */}
					</div>
				)}
			</I18n>
		);
	}
}
