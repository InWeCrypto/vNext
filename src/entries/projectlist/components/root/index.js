import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		setTimeout(() => {
			document.title = "InWe-项目列表";
			let minH = getMainMinHeight();
			this.setState({
				minH: minH
			});
			document.querySelector("#mainBox").style.minHeight = minH + "px";
			this.initPage();
		}, 0);
	}
	componentDidUpdate() {}
	initPage() {
		let annoBoxH = document.getElementById("mainBox").clientHeight;
		let annoBoxLiH = 103;
		let nums = Math.floor((annoBoxH - 150) / annoBoxLiH) || 4;
		// 默认条数4
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
	render() {
		const { minH } = this.state;
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
			project4
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
						<div id="mainBox" className="projectList ui">
							<div className="projectListReturn ui center">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
							<div className="projectListCon ui">
								{[1, 2, 3, 4].map((item, index) => {
									return (
										<div
											key={index}
											className="projectListConChild"
										>
											<div className="projectListConChildTitle">
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
																						{item.name.toLocaleUpperCase()}
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
																						? "projectListLiTopRight collect"
																						: "projectListLiTopRight nocollect"
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
																			<div className="right">
																				$90.00<span
																				>
																					(-12.00%)
																				</span>
																			</div>
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
																						{item.name.toLocaleUpperCase()}
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
																						? "projectListLiTopRight collect"
																						: "projectListLiTopRight nocollect"
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
																						{item.name.toLocaleUpperCase()}
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
																						? "projectListLiTopRight collect"
																						: "projectListLiTopRight nocollect"
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
																						{item.name.toLocaleUpperCase()}
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
																						? "projectListLiTopRight collect"
																						: "projectListLiTopRight nocollect"
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
											<div className="projectListConChildMore">
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
													<span className="ellitext">
														{t(
															"project.other",
															lng
														)}
														{index == 0 &&
															project.total -
																project.to}
														{index == 1 &&
															project2.total -
																project2.to}
														{index == 2 &&
															project3.total -
																project3.to}
														{index == 3 &&
															project4.total -
																project4.to}
														{t(
															"project.otherend",
															lng
														)}
													</span>
												</Link>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
