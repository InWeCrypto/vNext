import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import Calendar from "../../../../components/calendar";
import AnnoBox from "../../../../components/annobox";
import "./index.less";
class Root extends PureComponent {
	constructor() {
		super();
		this.state = {
			isToday: true,
			year: "",
			month: "",
			emonth: "",
			day: "",
			year2: "",
			month2: "",
			showAnno: false,
			annoItem: null
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.year2 != this.state.year2 ||
			nextState.month2 != this.state.month2
		) {
			this.getMonthData(nextState.year2, nextState.month2);
		}
		if (
			nextState.year != this.state.year ||
			nextState.month != this.state.month ||
			nextState.day != this.state.day
		) {
			this.getData(nextState.year, nextState.month, nextState.day);
		}
	}
	componentDidMount() {
		document.title = "InWe-" + i18n.t("navMenu.candybowl", this.props.lng);
		let minH = getMainMinHeight();
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		window.onresize = () => {
			let minH = getMainMinHeight();
			document.querySelector("#mainBox").style.minHeight = minH + "px";
		};
		var d = new Date();
		this.setState({
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			emonth: "",
			day: d.getDate(),
			year2: d.getFullYear(),
			month2: d.getMonth() + 1
		});
		this.props.getCandyMust();
	}
	dayClick(res) {
		this.setState({
			isToday: res.isToday,
			year: res.year,
			month: res.month,
			emonth: res.emonth,
			day: res.day
		});
	}
	getData(year, month, day) {
		let query = "?";
		query += `year=${year}`;
		query += `&month=${month}`;
		query += `&day=${day}`;
		this.props.getCandyList(query);
	}
	getMonthData(year, month) {
		let query = "?";
		query += `year=${year}`;
		query += `&month=${month}`;
		this.props.getCandyMonth(query);
	}
	changeMonthClick(res) {
		this.setState({
			year2: res.year,
			month2: res.month
		});
	}
	changeWarn() {
		let trunapp = window.CtrunappAdvHide;
		if (trunapp && IsTouchDevice) {
			trunapp.setState({
				advHide: false
			});
			return;
		}
		let params = {};
		params.enable = this.props.candyList.candy_bow_user ? false : true;
		params.bow_date = `${this.state.year}-${this.state.month}-${
			this.state.day
		}`;
		this.props.changeCandyWarn(params).then(res => {
			// if (res.code === 4001) {
			// 	Msg.prompt(res.msg);
			// }
		});
	}
	openAnnobox(id) {
		this.props
			.getCandyBow({
				id: id
			})
			.then(res => {
				let item = res.data;
				item.source_name = res.data.name;
				item.created_at = `${res.data.year}-${res.data.month}-${
					res.data.day
				}`;
				this.setState({
					showAnno: true,
					annoItem: item
				});
			});
	}
	closeAnnobox() {
		this.setState({
			showAnno: false,
			annoItem: null
		});
	}
	render() {
		const {
			lng,
			changeLng,
			userInfo,
			registerUser,
			loginIn,
			sendEmailCode,
			setReduxUserInfo,
			forgetUser,
			candyList,
			candyMonth,
			commonMarket,
			getHeaderMarket,
			candyMustList
		} = this.props;
		const { isToday, day, emonth, showAnno, annoItem } = this.state;

		return (
			<I18n>
				{(t, { I18n }) => (
					<div>
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
						<div className="main-box ui container" id="mainBox">
							{!IsTouchDevice && (
								<div className="candy-left">
									<LeftMenu lng={lng} />
								</div>
							)}

							<div className="candyBox ui f1">
								<div className="candy-calendar f1">
									<Calendar
										year={this.state.year}
										month={this.state.month}
										hasData={candyMonth ? candyMonth : []}
										changeMonth={this.changeMonthClick.bind(
											this
										)}
										dayClick={this.dayClick.bind(this)}
									/>
									<div className="must-read">
										{/* {candyMustList &&
											candyMustList.length > 0 && (
												<a
													target="_blank"
													href={candyMustList[0].url}
												>
													<span>
														{candyMustList[0].name}:{
															candyMustList[0]
																.desc
														}
													</span>
												</a>
											)} */}
									</div>
								</div>
								<div className="f1 m-todayBox">
									<div className="data-box">
										<div className="calendar-data-title ui center">
											<i className="icon-cadenlar" />
											{isToday && (
												<span className="calendar-text f1">
													Today
												</span>
											)}

											{!isToday && (
												<span className="f1">
													<span className="txt1">
														{day}/
													</span>
													<span className="txt2">
														{emonth}
													</span>
												</span>
											)}

											<div
												onClick={this.changeWarn.bind(
													this
												)}
												className={(() => {
													return candyList.candy_bow_user
														? "switch open"
														: "switch";
												})()}
											>
												<span className="switch-item" />
											</div>
										</div>
										<div className="data-group">
											{candyList &&
												candyList.list &&
												candyList.list.data &&
												candyList.list.data.length >
													0 &&
												candyList.list.data.map(
													(item, index) => {
														return (
															<a
																target="_blank"
																href={
																	item.url &&
																	item.url
																		.length >
																		0
																		? item.url
																		: "javascript:void(0)"
																}
																key={index}
																onClick={e => {
                                                                    if(item.url &&item.url.length >0)return;
																	this.openAnnobox(
																		item.id
																	);
																}}
																className="data-item"
															>
																<div className="title">
																	{item.name}
																</div>
																<div className="content">
																	{item.desc}
																</div>
															</a>
														);
													}
												)}
											{(!candyList ||
												!candyList.list ||
												!candyList.list.data ||
												candyList.list.data.length <=
													0) && (
												<div
													className="noBorder"
													style={{
														padding: "16px 0",
														borderBottom:
															"1px solid #f0f0f0"
													}}
												>
													{t("nodata", lng)}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>

						{showAnno && (
							<AnnoBox
								item={annoItem}
								close={this.closeAnnobox.bind(this)}
							/>
						)}
						<Footer lng={lng} changeLng={changeLng} />
					</div>
				)}
			</I18n>
		);
	}
}
export default Root;
