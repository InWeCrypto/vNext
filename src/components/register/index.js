import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { StyleSheet, css } from "aphrodite";
import { spaceInDown } from "react-magic";
import "./index.less";
class Register extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			seePass: false,
			//repeatPass: false,
			isSending: false,
			time: 60,
			email: "",
			code: "",
			password: "",
			password1: "",
			btnType: 1,
			hasBack: props.hasBack ? this.props.hasBac : false
		};
		this.styles = StyleSheet.create({
			magic: {
				animationName: spaceInDown,
				animationDuration: ".3s"
			}
		});
		this.inputChange = this.inputChange.bind(this);
	}
	togglePass(type) {
		let state = !this.state.seePass;
		this.setState({
			seePass: state
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
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.code != this.state.code ||
			nextState.email != this.state.email ||
			nextState.password != this.state.password ||
			nextState.password1 != this.state.password1
		) {
			if (
				nextState.code.length == 6 &&
				nextState.email.length >= 6 &&
				nextState.password.length >= 6 &&
				nextState.password1.length >= 6
			) {
				this.setState({
					btnType: 2
				});
			} else {
				this.setState({
					btnType: 1
				});
			}
		}
	}
	inputChange(type, e) {
		const { code, email, password, password1 } = this.state;
		let set = {};

		set[type] = e.target.value;
		this.setState({
			...set
		});
	}
	componentWillMount() {
		this.setState({ btnType: 1 });
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
		const { code, email, password, password1, btnType } = this.state;
		if (btnType != 2) {
			return;
		}
		if (email.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (code.length <= 0) {
			Msg.prompt(i18n.t("error.codeEmpty", this.props.lng));
			return;
		}
		if (password.length <= 0) {
			Msg.prompt(i18n.t("error.passwordEmpty", this.props.lng));
			return;
		}
		if (password1.length <= 0) {
			Msg.prompt(i18n.t("error.rpasswordEmpty", this.props.lng));
			return;
		}
		if (password1 != password) {
			Msg.prompt(i18n.t("error.passError", this.props.lng));
			return;
		}
		this.setState({ btnType: 3 });
		if (!this.props.isForget) {
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
						Msg.prompt(i18n.t("success.login", this.props.lng));
						this.props.close();
					} else {
						this.setState({ btnType: 2 });
					}
				});
		} else {
			this.props
				.forgetUser({
					code: code,
					email: email,
					password: password,
					password_confirmation: password1
				})
				.then(res => {
					if (res.code === 4000) {
						Msg.prompt(i18n.t("success.resetPass", this.props.lng));
						this.props.close();
					} else {
						this.setState({ btnType: 2 });
					}
				});
		}
	}
	render() {
		const { lng, close, hasBack, isForget } = this.props;
		const {
			seePass,
			isSending,
			time,
			email,
			code,
			password,
			password1,
			btnType
		} = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className={css(this.styles.magic)}>
								<div className="sign-inbox">
									<div className="register-box">
										<div className="register-title">
											{hasBack && (
												<i
													className="icon-return"
													onClick={close}
												/>
											)}
											{!isForget && (
												<span>InWeCrypto</span>
											)}
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
															seePass
																? "text"
																: "password")()}
													/>
												</div>
												<i
													onClick={this.togglePass.bind(
														this
													)}
													className={(() =>
														seePass
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
															seePass
																? "text"
																: "password")()}
													/>
												</div>
												{/* <i
													onClick={this.togglePass.bind(
														this,
														"repeatPass"
													)}
													className={(() =>
														repeatPass
															? "icon-see show-text"
															: "icon-see")()}
												/> */}
											</div>
											<div className="register-btn">
												<div
													className={(() => {
														if (btnType === 1) {
															return "btn disable";
														} else {
															return "btn";
														}
													})()}
													onClick={this.registerClick.bind(
														this
													)}
												>
													{isForget && (
														<span>
															{t(
																"signBox.register.resetPass",
																lng
															)}
															{btnType === 3 && (
																<span>...</span>
															)}
														</span>
													)}
													{!isForget && (
														<span>
															{t(
																"signBox.register.register",
																lng
															)}
															{btnType === 3 && (
																<span>...</span>
															)}
														</span>
													)}
												</div>
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
