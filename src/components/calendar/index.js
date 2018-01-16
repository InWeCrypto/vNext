import React, { PureComponent } from "react";
import "./index.less";
class Calendar extends PureComponent {
	constructor(props) {
		super(props);
		const newDate = new Date();
		this.state = {
			itemw: 0,
			clickDay: null,
			year: props.year ? props.year : newDate.getFullYear(),
			month: props.month ? props.month : newDate.getMonth() + 1,
			curDay: `${newDate.getFullYear()}-${newDate.getMonth() +
				1}-${newDate.getDate()}`,
			monthArr: [
				"January",
				"February",
				"March",
				"April",
				"May",
				"June",
				"July",
				"August",
				"September",
				"October",
				"November",
				"December"
			],
			day: {
				prev: [],
				curr: [],
				next: []
			}
		};
	}
	componentWillUpdate(nextProps, nextState) {
		if (nextState.month != this.state.month) {
			this.changeMonth(nextState.year, nextState.month);
		}
	}
	componentDidMount() {
		setTimeout(() => {
			this.setItem();
		}, 0);
		this.changeMonth(this.state.year, this.state.month);
	}
	changeMonth(y, m) {
		let newD = new Date(`${y}/${m}/1`);
		let we = newD.getDay();

		var res = {
			prev: [],
			curr: [],
			next: []
		};
		var prevT = this.setMonthDay(m - 1 < 1 ? 12 : m - 1, y),
			currT = this.setMonthDay(m, y);

		for (let i = prevT; i > prevT - we; i--) {
			res.prev.unshift(i);
		}
		for (let i = 1; i <= currT; i++) {
			res.curr.push(i);
		}

		let lastDay = new Date(`${y}/${m}/${currT}`);
		let we2 = lastDay.getDay();
		if (we2 != 6) {
			for (let i = 1; i < 7 - we2; i++) {
				res.next.push(i);
			}
		}
		this.setState({
			day: { ...res }
		});
	}
	setMonthDay(num, y) {
		let has31day = [1, 3, 5, 7, 8, 10, 12];
		let has30dat = [4, 6, 9, 11];
		let jue =
			(y % 100 == 0 && y / 400 == 0) || (y % 4 == 0 && y % 100 != 0)
				? 29
				: 28;
		let r;
		if (num != 2) {
			if (has31day.indexOf(num)) {
				r = 31;
			} else {
				r = 30;
			}
		} else {
			r = jue;
		}
		return r;
	}
	setItem() {
		const box = this.refs.calendarBox;
		const item = this.refs.item;
		const w = box.offsetWidth;
		const style = window.getComputedStyle(box);
		const pl = parseInt(style.paddingLeft, 10);
		const pr = parseInt(style.paddingRight, 10);
		const style1 = window.getComputedStyle(item);
		const ml = parseInt(style1.marginLeft);
		const mr = parseInt(style1.marginRight);
		const iw = parseInt(w / 7, 10);
		this.setState({
			itemw: iw
		});
	}
	setCurrentDayClass(idx) {
		let hasData = this.props.hasData ? this.props.hasData : [];
		if (idx == this.state.curDay) {
			return "day-item cur";
		}
		if (idx == this.state.clickDay) {
			if (hasData.indexOf(idx) == -1) {
				return "day-item click-item";
			}
			if (hasData.indexOf(idx) != -1) {
				return "day-item click-item has-data";
			}
		}
		if (hasData.indexOf(idx) != -1) {
			return "day-item has-data";
		}
		return "day-item";
	}
	getOtherMonth(type) {
		let goM, goY;
		if (type === "prev") {
			if (this.state.month - 1 < 1) {
				goM = 12;
				goY = this.state.year - 1;
			} else {
				goM = this.state.month - 1;
				goY = this.state.year;
			}
		} else {
			if (this.state.month + 1 > 12) {
				goM = 1;
				goY = this.state.year + 1;
			} else {
				goM = this.state.month + 1;
				goY = this.state.year;
			}
		}
		this.setState({
			year: goY,
			month: goM
		});
		if (typeof this.props.changeMonth == "function") {
			this.props.changeMonth({
				year: goY,
				month: goM
			});
		}
	}
	dayClick(item, idx) {
		if (typeof this.props.dayClick == "function") {
			this.props.dayClick({
				year: this.state.year,
				month: this.state.month,
				day: item,
				emonth: this.state.monthArr[this.state.month - 1].substr(0, 3),
				isToday: idx == this.state.curDay
			});
		}
		this.setState({
			clickDay: `${this.state.year}-${this.state.month}-${item}`
		});
	}
	render() {
		const iw = this.state.itemw;
		const { year, month, monthArr, day, curDay } = this.state;
		return (
			<div className="calendar-box">
				<div className="calendar-top">
					<div className="inline-box">
						<div className="month-box">
							<span
								className="leftbtn"
								onClick={this.getOtherMonth.bind(this, "prev")}
							/>
							<span className="month-txt">
								{monthArr && month && monthArr[month - 1]}.{
									year
								}
							</span>
							<span
								className="rightbtn"
								onClick={this.getOtherMonth.bind(this, "next")}
							/>
						</div>
					</div>
				</div>
				<div className="week-box">
					<div className="inline-box" ref="calendarBox">
						<div
							className="week-item"
							style={{ width: `${iw}px` }}
							ref="item"
						>
							S
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							M
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							T
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							W
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							T
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							F
						</div>
						<div className="week-item" style={{ width: `${iw}px` }}>
							S
						</div>
					</div>
				</div>
				<div className="day-box">
					<div className="inline-box">
						{day &&
							day.prev &&
							day.prev.length > 0 &&
							day.prev.map((item, index) => {
								return (
									<div
										className="day-item prev"
										style={{
											width: `${iw}px`,
											height: `${iw}px`,
											lineHeight: `${iw}px`
										}}
										key={index}
									>
										{item}
									</div>
								);
							})}
						{day &&
							day.curr &&
							day.curr.length > 0 &&
							day.curr.map((item, index) => {
								return (
									<div
										className={this.setCurrentDayClass(
											`${year}-${month}-${item}`
										)}
										style={{
											width: `${iw}px`,
											height: `${iw}px`,
											lineHeight: `${iw}px`
										}}
										key={index}
										onClick={this.dayClick.bind(
											this,
											item,
											`${year}-${month}-${item}`
										)}
									>
										{item}

										<span className="circle" />
									</div>
								);
							})}
						{day &&
							day.next &&
							day.next.length > 0 &&
							day.next.map((item, index) => {
								return (
									<div
										className="day-item next"
										style={{
											width: `${iw}px`,
											height: `${iw}px`,
											lineHeight: `${iw}px`
										}}
										key={index}
									>
										{item}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		);
	}
}
export default Calendar;
