import React, { PureComponent } from "react";
import http from "../../utils/ajax";
import { NavLink, Link } from "react-router-dom";
import { I18n, Trans } from "react-i18next";
import { StyleSheet, css } from "aphrodite";
import { puffIn, spaceInDown } from "react-magic";
import { setLocalItem } from "../../utils/util";
import "./index.less";

import searchIcon from "../../assets/images/search_m.png";

class searchIn extends PureComponent {
	constructor() {
		super();
		this.state = {
			inputBg: false,
			inputVal: "",
			toggleOpen: true
		};
	}
	componentDidMount() {
		window.onkeydown = function(event) {
			event = event || window.event;
			if (event.keyCode == 13) {
				if (this.state.inputBg) {
					window.location.href =
						"/search?type=2&k=" + this.state.inputVal;
				}
			}
		}.bind(this);
	}
	toggleBox(val) {
		this.setState({
			toggleOpen: val
		});
	}
	render() {
		const { lng, closeSearch } = this.props;
		const { inputBg, inputVal, toggleOpen } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div
						className={
							toggleOpen
								? "searchPro ui center open"
								: "searchPro ui center"
						}
					>
						<div className="searchInput ui center">
							<input
								type="text"
								id="input-search"
								onChange={e => {
									this.setState({
										inputVal: e.target.value
									});
								}}
								onFocus={e => {
									this.setState({
										inputBg: true
									});
								}}
								onBlur={() => {
									this.setState({
										inputBg: false
									});
								}}
							/>
							<label htmlFor="input-search">搜索项目</label>
							<img
								src={searchIcon}
								onClick={e => {
									this.toggleBox(true);
								}}
								alt=""
							/>
						</div>
						<div
							className="searchClose"
							onClick={e => {
								this.toggleBox(false);
							}}
						/>
					</div>
				)}
			</I18n>
		);
	}
}
export default searchIn;
