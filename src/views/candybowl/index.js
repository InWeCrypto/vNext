import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/";
import Calendar from "../components/calendar/";
import MustRead from "./components/mustread/";

import "./index.less";

class CandyBowl extends Component {
	constructor() {
		super();
		const nowD = new Date();
		this.state = {
			now: `${nowD.getFullYear()}-${nowD.getMonth() +
				1}-${nowD.getDate()}`,
			year: nowD.getFullYear(),
			month: nowD.getMonth() + 1,
			day: nowD.getDate(),
			showMustRead: false
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextState.month != this.state.month) {
			this.props.getCandyBowlByMonthAction({
				year: nextState.year,
				month: nextState.month
			});
		}
	}
	componentDidMount() {
		document.title = "Candy Bowl";
		this.props.getCandyBowlByMonthAction({
			year: this.state.year,
			month: this.state.month
		});
		this.props.getMustReadAction();
	}
	changeMonthClick(res) {
		this.setState({
			year: res.year,
			month: res.month
		});
	}
	dayClick(res) {
		this.setState({
			year: res.year,
			month: res.month,
			day: res.day
		});
	}
	showMustRead() {
		this.setState({
			showMustRead: true
		});
	}
	closeMustRead() {
		this.setState({
			showMustRead: false
		});
	}
	render() {
		const { candyBowlByMonth, mustRead } = this.props;
		let hasData = [];
		let dataObj = {};
		if (candyBowlByMonth && candyBowlByMonth.length > 0) {
			candyBowlByMonth.map(item => {
				if (
					item.year != null &&
					item.month != null &&
					item.day != null &&
					hasData.indexOf(`${item.year}-${item.month}-${item.day}`) ==
						-1
				) {
					hasData.push(`${item.year}-${item.month}-${item.day}`);
				}
				dataObj[`${item.year}-${item.month}-${item.day}`] = dataObj[
					`${item.year}-${item.month}-${item.day}`
				]
					? dataObj[`${item.year}-${item.month}-${item.day}`]
					: [];
				dataObj[`${item.year}-${item.month}-${item.day}`] = [
					...dataObj[`${item.year}-${item.month}-${item.day}`],
					item
				];
			});
		}
		return (
			<div className="candybowl-container">
				<div className="candybowl-title">Candy Bowl</div>
				{mustRead &&
					mustRead.length > 0 && (
						<div
							onClick={this.showMustRead.bind(this)}
							className="candybowl-must"
						>
							必读：{mustRead[0].name}
						</div>
					)}

				<div className="candybowl-cont">
					<div className="candybowl-calendar">
						<Calendar
							year={this.state.year}
							month={this.state.month}
							hasData={hasData}
							changeMonth={this.changeMonthClick.bind(this)}
							dayClick={this.dayClick.bind(this)}
						/>
					</div>
					<div className="candybowl-data">
						<div
							className={(() => {
								return dataObj[
									`${this.state.year}-${this.state.month}-${
										this.state.day
									}`
								]
									? "candybowl-cont"
									: "candybowl-cont none";
							})()}
						>
							<span>
								{(() => {
									return this.state.now ==
										`${this.state.year}-${
											this.state.month
										}-${this.state.day}`
										? "Today"
										: this.state.day;
								})()}
							</span>
							<div className="project-list">
								{dataObj &&
									dataObj[
										`${this.state.year}-${
											this.state.month
										}-${this.state.day}`
									] &&
									dataObj[
										`${this.state.year}-${
											this.state.month
										}-${this.state.day}`
									].map((item, index) => {
										return (
											<div
												key={index}
												className="project-name"
											>
												{item.name}
											</div>
										);
									})}
								{(!dataObj ||
									!dataObj[
										`${this.state.year}-${
											this.state.month
										}-${this.state.day}`
									]) && <div>暂无空投</div>}
							</div>
						</div>
					</div>
				</div>
				<div className="project-big">
					{dataObj &&
						dataObj[
							`${this.state.year}-${this.state.month}-${
								this.state.day
							}`
						] &&
						dataObj[
							`${this.state.year}-${this.state.month}-${
								this.state.day
							}`
						].map((item, index) => {
							return (
								<div key={index} className="project-item">
									<div className="project-img">
										<img src={item.img} />
										<div className="project-name">
											{(() => {
												return item.name.replace(
													"空投",
													""
												);
											})()}
										</div>
									</div>
									<div className="project-cont">
										<div>{item.desc}</div>
										<div className="project-more">
											<Link
												className="project-more-btn"
												to={{
													pathname: "/project",
													search:
														"?id=" + item.project_id
												}}
											>
												more detail
											</Link>
										</div>
									</div>
								</div>
							);
						})}
				</div>
				{this.state.showMustRead && (
					<MustRead
						closeMethod={this.closeMustRead.bind(this)}
						content={mustRead}
					/>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		candyBowlByMonth: state.candayBowlData.candyBowlByMonth,
		mustRead: state.candayBowlData.mustRead
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getCandyBowlByMonthAction: actions.getCandyBowlByMonthAction(dispatch),
		getMustReadAction: actions.getMustReadAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CandyBowl)
);
