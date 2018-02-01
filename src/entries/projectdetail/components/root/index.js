import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import GaiKuo from "../../../../components/gaikuo";
import TurnApp from "../../../../components/turnapp";
import ProjectDetailIco from "../projectdetailico";
import ProjectDetailInfo from "../projectdetailinfo";
import ProjectDetailIntro from "../projectdetailintro";
import ProjectDetailGaiKuo from "../projectdetailgaikuo";
import ProjectDetailChat from "../projectdetailchat";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			cur: "",
			minH: "auto",
			ico: false,
			gaikuo: false,
			home: false,
			info: false,
			intro: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.project", this.props.lng);
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(location) {
		let p = getQuery(location);
		this.props
			.getProjectDetail({
				c_id: p.c_id
			})
			.then(res => {
				if (res.data.type !== 1) {
					this.setState({
						ico: true
					});
				} else {
					this.setState({
						gaikuo: true
					});
				}
				if (p.type && ["home", "info", "intro"].indexOf(p.type) != -1) {
					this.setShowItem(p.type);
				} else {
					this.setShowItem("home");
				}
				return res;
			})
			.then(res => {
				if (this.state.gaikuo) {
					this.props.getCoinTimePrice({
						ico_type: res.data.unit
					});
				}
			});
		//获取项目动态
		this.props.getProjectDynamic();
	}
	setShowItem(type) {
		let set = {
			cur: "",
			home: false,
			info: false,
			intro: false
		};
		set[type] = true;
		set["cur"] = type;
		this.setState(set);
	}
	componentDidUpdate() {}
	render() {
		const { minH, ico, gaikuo, info, intro, home } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			projectDetail,
			coinTimePrice,
			projectDynamic,
			projectDynamicList,
			setProjectRemind,
			getProjectCollect,
			getProjectDynamicList,
			getDynamicScrollList,
			getProjectScore,
			unProjectDot,
			projectKdata,
			getKdata,
			getMarkets,
			markets,
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
							nofixed={true}
						/>
						<div id="mainBox" className="projectDetail ui">
							{IsTouchDevice && (
								<div id="m-nav" className="navContainer">
									<ul
										id="m-nav-c"
										className="projectDetailCon3Ul"
									>
										<li className={home ? "cur" : ""}>
											<Link
												to={{
													pathname: "projectdetail",
													search:
														"?c_id=" +
														(projectDetail &&
															projectDetail.id) +
														"&type=home"
												}}
											>
												<span>
													{t(
														"projectDetail.project_summary",
														lng
													)}
												</span>
											</Link>
										</li>
										<li className={info ? "cur" : ""}>
											<Link
												to={{
													pathname: "projectdetail",
													search:
														"?c_id=" +
														(projectDetail &&
															projectDetail.id) +
														"&type=info"
												}}
											>
												<span>
													{t(
														"projectDetail.project_dyna",
														lng
													)}
												</span>
											</Link>
										</li>
										<li className={intro ? "cur" : ""}>
											<Link
												to={{
													pathname: "projectdetail",
													search:
														"?c_id=" +
														(projectDetail &&
															projectDetail.id) +
														"&type=intro"
												}}
											>
												<span>
													{t(
														"projectDetail.project_intro",
														lng
													)}
												</span>
											</Link>
										</li>
									</ul>
								</div>
							)}
							<div className="mainCon ui">
								{home &&
									ico && (
										<ProjectDetailIco
											lng={lng}
											projectDetail={projectDetail}
											setProjectRemind={setProjectRemind}
											getProjectCollect={
												getProjectCollect
											}
										/>
									)}
								{home &&
									gaikuo && (
										<ProjectDetailGaiKuo
											lng={lng}
											projectDetail={projectDetail}
											coinTimePrice={coinTimePrice}
											setProjectRemind={setProjectRemind}
											getProjectCollect={
												getProjectCollect
											}
											projectKdata={projectKdata}
											getKdata={getKdata}
											getMarkets={getMarkets}
											markets={markets}
										/>
									)}
								{info && (
									<ProjectDetailInfo
										lng={lng}
										projectDetail={projectDetail}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
										projectDynamic={projectDynamic}
										projectDynamicList={projectDynamicList}
										getProjectDynamicList={
											getProjectDynamicList
										}
										getDynamicScrollList={
											getDynamicScrollList
										}
										unProjectDot={unProjectDot}
									/>
								)}
								{intro && (
									<ProjectDetailIntro
										lng={lng}
										projectDetail={projectDetail}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
									/>
								)}
							</div>
							<div className="projectDetailCon3">
								<ul className="projectDetailCon3Ul m-hide">
									<li className={home ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													(projectDetail &&
														projectDetail.id) +
													"&type=home"
											}}
										>
											<span>
												{t(
													"projectDetail.project_summary",
													lng
												)}
											</span>
										</Link>
									</li>
									<li className={info ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													(projectDetail &&
														projectDetail.id) +
													"&type=info"
											}}
										>
											<span>
												{t(
													"projectDetail.project_dyna",
													lng
												)}
											</span>
										</Link>
									</li>
									<li className={intro ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													(projectDetail &&
														projectDetail.id) +
													"&type=intro"
											}}
										>
											<span>
												{t(
													"projectDetail.project_intro",
													lng
												)}
											</span>
										</Link>
									</li>
								</ul>
								<ProjectDetailChat
									lng={lng}
									projectDetail={projectDetail}
									getProjectScore={getProjectScore}
								/>
							</div>
						</div>
						{IsTouchDevice && (
							<div>
								<TurnApp />
								<div id="footerBox" />
							</div>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
