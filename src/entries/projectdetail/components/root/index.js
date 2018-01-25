import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import GaiKuo from "../../../../components/gaikuo";
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
		document.title = "InWe-ICO";
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
				this.props.getCoinTimePrice({
					ico_type: res.data.unit
				});
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
			getProjectScore,
			unProjectDot
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
						/>
						<div id="mainBox" className="projectDetail ui">
							{IsTouchDevice && (
								<ul className="projectDetailCon3Ul">
									<li className={home ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=home"
											}}
										>
											<span>项目概况</span>
										</Link>
									</li>
									<li className={info ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=info"
											}}
										>
											<span>项目动态</span>
										</Link>
									</li>
									<li className={intro ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=intro"
											}}
										>
											<span>项目介绍</span>
										</Link>
									</li>
								</ul>
							)}
							{home &&
								ico && (
									<ProjectDetailIco
										lng={lng}
										projectDetail={projectDetail}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
									/>
								)}
							{home &&
								gaikuo && (
									<ProjectDetailGaiKuo
										lng={lng}
										projectDetail={projectDetail}
										coinTimePrice={coinTimePrice}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
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
							<div className="projectDetailCon3">
								<ul className="projectDetailCon3Ul m-hide">
									<li className={home ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=home"
											}}
										>
											<span>项目概况</span>
										</Link>
									</li>
									<li className={info ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=info"
											}}
										>
											<span>项目动态</span>
										</Link>
									</li>
									<li className={intro ? "cur" : ""}>
										<Link
											to={{
												pathname: "projectdetail",
												search:
													"?c_id=" +
													projectDetail.id +
													"&type=intro"
											}}
										>
											<span>项目介绍</span>
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
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
