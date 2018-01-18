import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";

import "./index.less";
class Register extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			surePass: false,
			repeatPass: false,
			isSending: false,
			time: 60,
			email: "",
			code: "",
			password: "",
			password1: "",
			hasBack: props.hasBack ? this.props.hasBac : false
		};
		this.inputChange = this.inputChange.bind(this);
	}
	togglePass(type) {
		let state = !this.state[type];
		this.setState({
			[type]: state
		});
	}
	sendEmail() {
		if (this.state.time <= 0) {
			this.setState({
				time: 60,
				isSending: false
			});
			return;
		}
		let nextTime = this.state.time - 1;
		this.setState({
			time: nextTime,
			isSending: !this.state.isSending ? true : this.state.isSending
		});
		var timer = null;
		timer = setTimeout(() => {
			this.sendEmail.call(this);
		}, 1000);
	}
	inputChange(type, e) {
		let val = e.target.value;
		this.setState({
			[type]: val
		});
	}
	sendCode() {
		if (this.state.email.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		this.sendEmail();
		this.props.sendEmail(this.state.email);
	}
	registerClick() {
		const { code, email, password, password1 } = this.state;
		this.props
			.registerUser({
				code: code,
				email: email,
				name: email,
				password: password,
				password_confirmation: password1
			})
			.then(res => {
				if (res.code === 4000) {
					Msg.prompt(i18n.t("success,login", this.props.lng));
					//setLocalItem("userInfo", JSON.stringify(res.data));
					this.props.close();
				}
			});
	}
	render() {
		const { lng, close, hasBack, isForget } = this.props;
		const {
			surePass,
			repeatPass,
			isSending,
			time,
			email,
			code,
			password,
			password1
		} = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className="sign-inbox">
								<div className="register-box">
									<div className="register-title">
										{hasBack && (
											<i
												className="icon-return"
												onClick={close}
											/>
										)}
										{!isForget && <span>InWeCrypto</span>}
										{isForget && (
											<span>
												{t(
													"signBox.register.forget",
													lng
												)}
											</span>
										)}
										{!hasBack && (
											<i
												className="icon-close"
												onClick={close}
											/>
										)}
									</div>
									<div className="register-cont">
										<div className="register-item ui center">
											<div className="register-name">
												{t(
													"signBox.register.email",
													lng
												)}:
											</div>
											<div className="register-input">
												<input
													onChange={e => {
														this.inputChange(
															"email",
															e
														);
													}}
													value={email}
													className="input"
													type="text"
													placeholder={t(
														"signBox.register.email",
														lng
													)}
												/>
											</div>
										</div>
										<div className="register-item ui center">
											<div className="register-name">
												{t(
													"signBox.register.code",
													lng
												)}:
											</div>
											<div className="register-input">
												<input
													onChange={e => {
														this.inputChange(
															"code",
															e
														);
													}}
													value={code}
													className="input"
													type="text"
													placeholder={t(
														"signBox.register.code",
														lng
													)}
												/>
											</div>
											{!isSending && (
												<button
													onClick={this.sendCode.bind(
														this
													)}
													className="btn1"
												>
													{t(
														"signBox.register.send",
														lng
													)}
												</button>
											)}
											{isSending && (
												<button className="btn2">
													{time}s
												</button>
											)}
										</div>
										<div className="register-item ui center">
											<div className="register-name">
												{t(
													"signBox.register.password",
													lng
												)}:
											</div>
											<div className="register-input">
												<input
													onChange={e => {
														this.inputChange(
															"password",
															e
														);
													}}
													value={password}
													className="input"
													placeholder={t(
														"signBox.register.password",
														lng
													)}
													type={(() =>
														surePass
															? "text"
															: "password")()}
												/>
											</div>
											<i
												onClick={this.togglePass.bind(
													this,
													"surePass"
												)}
												className={(() =>
													surePass
														? "icon-see show-text"
														: "icon-see")()}
											/>
										</div>
										<div className="register-item ui center">
											<div className="register-name">
												{t(
													"signBox.register.repeatPassword",
													lng
												)}:
											</div>
											<div className="register-input">
												<input
													onChange={e => {
														this.inputChange(
															"password1",
															e
														);
													}}
													value={password1}
													className="input"
													placeholder={t(
														"signBox.register.repeatPassword",
														lng
													)}
													type={(() =>
														repeatPass
															? "text"
															: "password")()}
												/>
											</div>
											<i
												onClick={this.togglePass.bind(
													this,
													"repeatPass"
												)}
												className={(() =>
													repeatPass
														? "icon-see show-text"
														: "icon-see")()}
											/>
										</div>
										<div className="register-btn">
											<div
												className="btn"
												onClick={this.registerClick.bind(
													this
												)}
											>
												{t(
													"signBox.register.register",
													lng
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default Register;
