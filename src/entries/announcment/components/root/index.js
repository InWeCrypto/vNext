import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-announcment";
		this.props.getAnnouncment();
		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			lfMore: "leftArrow",
			rtMore: "rightArrow more"
		};
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
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<Header />
						<div id="mainBox" className="anno ui">
							<div className="left-menus ui center">
								<div className="left-menus-anno">
									<LeftMenu lng={lng} />
								</div>
							</div>
							<div id="annoBox" className="annoBox ui f1">
								<div className="annoBoxArrow ui center">
									<span
										className={this.state.lfMore}
										onClick={() => {
											this.annoMove("left");
										}}
									/>
								</div>
								<div id="annoCon" className="annoCon ui">
									<ul className="ui">
										{[1, 2, 3, 4].map((item, index) => {
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
									</ul>
									<ul className="ui">
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
									</ul>
								</div>
								<div className="annoBoxArrow ui center">
									<span
										className={this.state.rtMore}
										onClick={() => {
											this.annoMove("right");
										}}
									/>
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
