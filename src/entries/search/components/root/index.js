import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			inputBg: false,
			k: ""
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-Trading";

		let minH = getMainMinHeight();
		let liH = minH / 2;
		this.setState({
			minH: minH,
			liH: liH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(search) {
		let q = getQuery(search);
		this.setState({
			k: q.k || ""
		});
		this.props.getSearch({
			k: q.k
		});
	}
	render() {
		const { minH, liH, page, inputBg } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			search
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
						/>
						<div id="mainBox" className="searchBox">
							<div
								className={
									inputBg
										? "searchInput ui center jcenter focus"
										: "searchInput ui center jcenter"
								}
							>
								<b />
								<input
									type="text"
									placeholder="Search you want to know"
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
							</div>
							<div className="searchResult">
								<ul className="searchResultUl">
									{search &&
										search.data &&
										search.data.length > 0 &&
										search.data.map((item, index) => {
											return (
												<li key={index} className="ui">
													{item.img && (
														<div className="imgLf">
															<img
																src={item.img}
																alt=""
															/>
														</div>
													)}
													<div className="conRt f1">
														<span className="conRtTitle">
															-Nazi case:Two men
															plead not guilty to
															terror charhes
														</span>
														<p className="conRtDesc ellitext">
															are also accused of
															being members of the
															banned neo-Nazi
															group national.are
															also accused of
															being …
														</p>
													</div>
												</li>
											);
										})}
								</ul>
							</div>
						</div>
						<Footer changeLng={changeLng} lng={lng} />
					</div>
				)}
			</I18n>
		);
	}
}
