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
class Header extends PureComponent {
	constructor() {
		super();
		this.state = {
			showMember: false,
			showLogin: false,
			showSendEmail: false,
			showRegister: false,
			registerHasBack: false,
			fastSign: false
		};
		this.changeMember = this.changeMember.bind(this);
		document.addEventListener("click", this.changeMember, false);
	}
	changeMember() {
		this.setState({
			showMember: false
		});
	}
	componentWillUnmount() {
		//重写组件的setState方法，直接返回空
		this.setState = (state, callback) => {
			return;
		};
	}
	toggleMember(e) {
		e.stopPropagation();
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
	openEmail() {
		this.setState({
			showSendEmail: true
		});
	}
	closeEmail() {
		this.setState({
			showSendEmail: false
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
	closeRegister() {
		this.setState({
			showRegister: false
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
	render() {
		const { lng, sendEmailCode } = this.props;
		const {
			showMember,
			showSign,
			showLogin,
			showSendEmail,
			showRegister,
			registerHasBack,
			fastSign
		} = this.state;
		return (
			<div id="headerBox" className="header-box container ui center">
				<div className="heder-left ui center">
					<img className="img" src={headerNews} />
					<div className="headernews-box f1">
						<span className="headernews-item">
							BTC $15366 +9.9%
						</span>
					</div>
				</div>
				<div className="heder-middle f1">InWeCrypto</div>
				<div className="header-right">
					<span onClick={this.Login.bind(this)} className="rightbtn">
						Login
					</span>
					<span
						onClick={this.openRegisterByHeader.bind(this)}
						className="rightbtn"
					>
						Sign Up
					</span>
				</div>
				{/* <div className="heder-right">
					<div
						className="member"
						onClick={e => {
							this.toggleMember(e);
						}}
					>
						<i className="member-info" />
						<img className="img" src={defaultHeader} />
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
								<span className="member-itemtext">退出</span>
							</div>
						</div>
					)}
					
                </div> */}
				{showLogin && (
					<SignIn
						openEmail={this.openEmail.bind(this)}
						closeSign={this.closeSignIn.bind(this)}
						openRegister={this.openRegisterByLogin.bind(this)}
						openFast={this.openFastSign.bind(this)}
						lng={lng}
					/>
				)}
				{showSendEmail && (
					<EmailCode
						closeEmail={this.closeEmail.bind(this)}
						lng={lng}
					/>
				)}
				{fastSign && (
					<FastSign close={this.closeFastSign.bind(this)} lng={lng} />
				)}
				{showRegister && (
					<Register
						hasBack={registerHasBack}
						close={this.closeRegister.bind(this)}
						sendEmailCode={sendEmailCode}
						lng={lng}
					/>
				)}
			</div>
		);
	}
}
export default Header;
