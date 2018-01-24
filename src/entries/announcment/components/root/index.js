import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		setTimeout(() => {
			document.title = "InWe-announcment";
			let minH = getMainMinHeight();
			let liH = minH / 2;
			this.setState({
				minH: minH,
				liH: liH
			});
			document.querySelector("#mainBox").style.minHeight = minH + "px";
			this.initPage(this.props.location.search);
		}, 0);
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			lfMore: "leftArrow",
			rtMore: "rightArrow more",
			page: 1,
			nums: 8
		};
	}
	initPage(location) {
		let p = getQuery(location);
		let annoBoxH = document.getElementById("annoCon").clientHeight;
		let annoBoxLiH = 103;
		let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;

		if (p.page) {
			this.setState({
				page: p.page
			});
		}

		this.props.getAnnouncment({
			page: p.page || 1,
			per_page: nums
		});
	}
	annoMove(val) {
		if (val == "left" && this.state.lfMore == "leftArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
			console.log(nums);
		} else if (val == "right" && this.state.rtMore == "rightArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
			console.log(nums);
		}
	}
	render() {
		const { minH, liH, rtMore, lfMore } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			announcment
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
						/>
						<div id="mainBox" className="anno ui">
							<div className="left-menus ui center">
								<div className="left-menus-anno">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="annoBox" className="annoBox ui f1">
								<div className="annoBoxArrow ui center">
									{announcment.prev_page_url && (
										<Link
											to={{
												pathname: "/announcment",
												search:
													"?page=" +
													(announcment.current_page -
														1)
											}}
										>
											<span
												className={
													announcment.prev_page_url
														? "leftArrow more"
														: "leftArrow"
												}
											/>
										</Link>
									)}
									{!announcment.prev_page_url && (
										<span
											className={
												announcment.prev_page_url
													? "leftArrow more"
													: "leftArrow"
											}
										/>
									)}
								</div>
								<div id="annoCon" className="annoCon ">
									<ul className="ui">
										{announcment &&
											announcment.data &&
											announcment.data.length > 0 &&
											announcment.data.map(
												(item, index) => {
													return (
														<li
															key={index}
															className=""
														>
															{item.source_url && (
																<Link
																	to={{
																		pathname:
																			item.source_url
																	}}
																	target="_blank"
																>
																	<div className="liBox">
																		<p className="annoBoxLiText ellitext">
																			+{
																				item.source_name
																			}：{
																				item.content
																			}
																		</p>
																		<p className="annoBoxLiDate">
																			{
																				item.updated_at
																			}
																		</p>
																	</div>
																</Link>
															)}
															{!item.source_url && (
																<Link
																	to={{
																		pathname:
																			"newsdetail",
																		search:
																			"?art_id=" +
																			item.id
																	}}
																>
																	<div className="liBox">
																		<p className="annoBoxLiText ellitext">
																			+{
																				item.source_name
																			}：{
																				item.content
																			}
																		</p>
																		<p className="annoBoxLiDate">
																			{
																				item.updated_at
																			}
																		</p>
																	</div>
																</Link>
															)}
														</li>
													);
												}
											)}
									</ul>
									{/* <ul className="ui">
										{[1, 2].map((item, index) => {
											return (
												<li key={index} className="">
													<p className="annoBoxLiText ellitext">
														+火币：火币全球专业站12月27日14:00上线NEO、GAS
													</p>
													<p className="annoBoxLiDate">
														2017-11-16 11:35:33
													</p>
												</li>
											);
										})}
									</ul> */}
								</div>
								<div className="annoBoxArrow ui center">
									{announcment.next_page_url && (
										<Link
											to={{
												pathname: "/announcment",
												search:
													"?page=" +
													(announcment.current_page +
														1)
											}}
										>
											<span
												className={
													announcment.next_page_url
														? "rightArrow more"
														: "rightArrow"
												}
											/>
										</Link>
									)}
									{!announcment.next_page_url && (
										<span
											className={
												announcment.next_page_url
													? "rightArrow more"
													: "rightArrow"
											}
										/>
									)}
								</div>
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}