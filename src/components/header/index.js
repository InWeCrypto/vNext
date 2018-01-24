import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import "./index.less";
import SignIn from "../signin/";
import FastSign from "../fastsign/";
import Register from "../register/";
import EmailCode from "../emailcode/";
import ResetPassword from "../resetpassword/";
import defaultHeader from "../../assets/images/member_img.png";
import headerNews from "../../assets/images/headernews.png";
import homeMenu from "../../assets/images/home_menu_ico@2x.png";
import searchicon from "../../assets/images/search_ico@2x.png";
import titleCat from "../../assets/images/touxiang_ico@2x.png";
import { browserHistory } from "react-router-dom";
class Header extends PureComponent {
	constructor(props) {
		super();
		this.state = {
			showMember: false,
			showLogin: false,
			showSendEmail: false,
			showRegister: false,
			registerHasBack: false,
			fastSign: false,
			isForget: false,
			//cdy
			menuShow: false,
			menuMap: [
				"InWe",
				"Project",
				"News",
				"Candybowl",
				"Trading view",
				"Announcment",
				"Search you want to know"
			]
		};

		this.changeMember = this.changeMember.bind(this);
		this.showMenu = this.showMenu.bind(this);
	}
	changeMember() {
		this.setState({
			showMember: false
		});
	}
	componentDidMount() {
		document.addEventListener("click", this.changeMember, false);
	}
	componentWillUnmount() {
		//重写组件的setState方法，直接返回空
		this.setState = (state, callback) => {
			return;
		};
	}
	toggleMember(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			showMember: !this.state.showMember
		});
	}
	Login() {
		this.setState({
			showLogin: true
		});
	}
	closeSignIn() {
		this.setState({
			showLogin: false
		});
	}
	openRegisterByLogin() {
		this.setState({
			showRegister: true,
			registerHasBack: true
		});
	}
	openRegisterByHeader() {
		this.setState({
			showRegister: true,
			registerHasBack: false
		});
	}
	openRegisterByForget() {
		this.setState({
			showRegister: true,
			registerHasBack: true,
			isForget: true
		});
	}
	closeRegister() {
		this.setState({
			showRegister: false,
			registerHasBack: false,
			isForget: false
		});
	}
	openFastSign() {
		this.setState({
			fastSign: true
		});
	}
	closeFastSign() {
		this.setState({
			fastSign: false
		});
	}
	loginOut(e) {
		e.nativeEvent.stopImmediatePropagation();
		localStorage.removeItem("userInfo");
		this.props.setReduxUserInfo(null);
		if (window.location.href.indexOf("/member")) {
			window.location.href = "/";
		}
	}
	// 点击显示隐藏菜单
	showMenu(e) {
		e.nativeEvent.stopImmediatePropagation();
		let menuShow = this.state.menuShow;
		this.setState({ menuShow: !menuShow });
	}
	// 点击搜索
	searchBtnClick(e) {}

	render() {
		const {
			lng,
			sendEmail,
			registerUser,
			loginIn,
			userInfo,
			forgetUser,
			nofixed
		} = this.props;
		const {
			showMember,
			showSign,
			showLogin,
			showRegister,
			registerHasBack,
			fastSign,
			isForget,
			menuShow,
			menuMap
		} = this.state;
		return (
			<div>
				{IsTouchDevice && !nofixed && <div className="m-header-hold" />}
				{IsTouchDevice && (
					<div
						className={
							nofixed ? "m-header-box" : "m-header-box fixed"
						}
					>
						<div
							className={
								menuShow
									? "m-menu-btn hamburger hamburger--elastic is-active"
									: "m-menu-btn hamburger hamburger--elastic"
							}
							onClick={this.showMenu}
						>
							<div className="hamburger-box">
								<div className="hamburger-inner" />
							</div>
						</div>
						<div className="m-header-title">
							<img src={titleCat} alt="" />
							<span>InWeCrypto</span>
						</div>
					</div>
				)}
				{IsTouchDevice && (
					<div
						className={menuShow ? "menuMap menuMapShow" : "menuMap"}
					>
						<div className="menuHold" />
						{menuMap.map((val, idx) => {
							if (idx == menuMap.length - 1) {
								return (
									<div
										key={idx}
										className="menuCell"
										onClick={this.searchBtnClick.bind(this)}
									>
										<img src={searchicon} alt="" />
										{val}
									</div>
								);
							} else {
								return (
									<div key={idx} className="menuCell">
										{val}
									</div>
								);
							}
						})}
					</div>
				)}

				<div id="headerBox" className="header-box container ui center">
					<div className="heder-left ui f1 center jstart">
						<img className="img" src={headerNews} />
						<div className="headernews-box f1">
							<span className="headernews-item">
								BTC $15366 +9.9%
							</span>
						</div>
					</div>
					<div className="heder-middle f1">InWeCrypto</div>
					{!userInfo && (
						<div className="heder-right f1 ui jend">
							<span
								onClick={this.Login.bind(this)}
								className="rightbtn"
							>
								Login
							</span>
							<span
								onClick={this.openRegisterByHeader.bind(this)}
								className="rightbtn"
							>
								Sign Up
							</span>
						</div>
					)}
					{userInfo &&
						userInfo.token && (
							<div className="heder-right">
								<div
									className="member"
									onClick={e => {
										this.toggleMember(e);
									}}
								>
									<i className="member-info" />
									<img
										className="img"
										src={
											userInfo.img
												? userInfo.img
												: defaultHeader
										}
									/>
								</div>
								{showMember && (
									<div className="member-more">
										<Link
											to={{
												pathname: "/member",
												search: "?type=message"
											}}
											className="member-item"
										>
											<span className="icon-box">
												<i className="icon-message" />
												<i className="circle" />
											</span>
											<span className="member-itemtext">
												未读消息
											</span>
										</Link>
										<Link
											to={{
												pathname: "/member",
												search: "?type=collection"
											}}
											className="member-item"
										>
											<span className="icon-box">
												<i className="icon-personal" />
											</span>
											<span className="member-itemtext">
												个人中心
											</span>
										</Link>
										<div className="member-item">
											<span className="icon-box">
												<i className="icon-out" />
											</span>
											<span
												onClick={e => {
													this.loginOut(e);
												}}
												className="member-itemtext"
											>
												退出
											</span>
										</div>
									</div>
								)}
							</div>
						)}

					{showLogin && (
						<SignIn
							loginIn={loginIn}
							closeSign={this.closeSignIn.bind(this)}
							openRegister={this.openRegisterByLogin.bind(this)}
							openForget={this.openRegisterByForget.bind(this)}
							openFast={this.openFastSign.bind(this)}
							lng={lng}
						/>
					)}
					{fastSign && (
						<FastSign
							close={this.closeFastSign.bind(this)}
							lng={lng}
						/>
					)}
					{showRegister && (
						<Register
							forgetUser={forgetUser}
							isForget={isForget}
							hasBack={registerHasBack}
							close={this.closeRegister.bind(this)}
							sendEmail={sendEmail}
							registerUser={registerUser}
							lng={lng}
						/>
					)}
				</div>
			</div>
		);
	}
}
export default Header;
