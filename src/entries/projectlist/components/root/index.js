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
		this.props.getProjectList();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	componentDidUpdate() {}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
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
												<li>
													<div className="projectListLiTop ui center">
														<div className="projectListLiTopLeft ui center">
															<div className="projectListImg newMsg">
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
																	? "projectListLiTopRight collect"
																	: "projectListLiTopRight nocollect"
															}
														/>
													</div>
													<div className="projectListLiCenter">
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
											</ul>
											<div className="projectListConChildMore">
												<Link
													to={{
														pathname:
															"/projectopen",
														search: ""
													}}
												>
													<span className="ellitext">
														{t(
															"project.other",
															lng
														)}
														14
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
