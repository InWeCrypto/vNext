import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import Calendar from "../../../../components/calendar";
import "./index.less";
class Root extends PureComponent {
	constructor() {
		super();
		this.state = {
			isToday: true,
			year: "",
			month: "",
			emonth: "",
			day: ""
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.year != this.state.year ||
			nextState.month != this.state.month ||
			nextState.day != this.state.day
		) {
			this.getData(nextState.year, nextState.month, nextState.day);
		}
	}
	componentDidMount() {
		document.title = "InWe-CandyBowl";
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
			day: d.getDate()
		});
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
			candyList
		} = this.props;
		const { isToday, day, emonth } = this.state;
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
						/>
						<div className="main-box ui container" id="mainBox">
							<div className="candy-left">
								<LeftMenu lng={lng} />
							</div>
							<div className="ui f1">
								<div className="candy-calendar f1">
									<Calendar
										dayClick={this.dayClick.bind(this)}
									/>
									<div className="must-read">
										<span>必读：是大神大所</span>
									</div>
								</div>
								<div className="f1 ">
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

											<div className="switch open">
												<span className="switch-item" />
											</div>
										</div>
										<div className="data-group">
											{candyList &&
												candyList.data &&
												candyList.data.length > 0 &&
												candyList.data.map(
													(item, index) => {
														return (
															<div className="data-item">
																<div className="title">
																	222
																</div>
																<div className="content">
																	2323
																</div>
															</div>
														);
													}
												)}
											{(!candyList ||
												!candyList.data ||
												candyList.data.length <= 0) && (
												<div>{t("nodata", lng)}</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer lng={lng} changeLng={changeLng} />
					</div>
				)}
			</I18n>
		);
	}
}
export default Root;
