import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-项目列表";
		this.props.getProjectOpen();
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
	}
	componentDidUpdate() {}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liW: "auto",
			liH: "auto",
			liMR: "auto"
		};
	}
	render() {
		const { minH, liW, liH, liMR } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="projectOpen ui">
							<div className="projectOpenLeft ui center">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
							<div className="projectOpenCon ui">
								<div className="projectOpenConChild">
									<div className="projectOpenConChildTitle">
										<span className="ellitext">
											{t("project.trading", lng)}
										</span>
									</div>
									<ul
										id="projectOpenConChildUl"
										className="projectOpenConChildUl"
									>
										{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
											(item, index) => {
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
																	<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515589318224&di=6418f077b77d7451a1246c6cfe793406&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131124%2F6608733_084856944000_2.jpg" />
																</div>
																<p>
																	<span className="ellitext">
																		NEO
																	</span>
																	<b className="ellitext">
																		(neo)
																	</b>
																</p>
															</div>
															<div
																className={
																	index == 2
																		? "projectOpenLiTopRight collect"
																		: "projectOpenLiTopRight nocollect"
																}
															/>
														</div>
														<div className="projectOpenLiCenter">
															<div className="left">
																Blockchain
															</div>
															{index == 0 && (
																<div className="right">
																	$90.00<span>
																		(-12.00%)
																	</span>
																</div>
															)}
														</div>
													</li>
												);
											}
										)}
									</ul>
								</div>
							</div>
							<div className="projectOpenRight show ui center">
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
