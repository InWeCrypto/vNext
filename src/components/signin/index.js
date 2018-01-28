import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { StyleSheet, css } from "aphrodite";
import { puffIn, spaceInDown } from "react-magic";
import { setLocalItem } from "../../utils/util";
import "./index.less";
class SignIn extends PureComponent {
	constructor() {
		super();
		this.state = {
			showPassword: false,
			email: "",
			password: "",
			btnType: 1
		};
		this.styles = StyleSheet.create({
			magic: {
				animationName: spaceInDown,
				animationDuration: ".3s"
			}
		});
	}
	setPassType() {
		return this.state.showPassword ? "text" : "password";
	}
	changePassType() {
		let type = !this.state.showPassword;
		this.setState({
			showPassword: type
		});
	}
	componentWillMount() {
		this.setState({ btnType: 1 });
	}
	componentWillUpdate(nextProps, nextState) {
		if (
			nextState.email != this.state.email ||
			nextState.password != this.state.password
		) {
			if (nextState.email.length >= 6 && nextState.password.length >= 6) {
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
	setIconClass() {
		return this.state.showPassword ? "icon-see show-text" : "icon-see";
	}
	inputChange(type, e) {
		let set = {};

		set[type] = e.target.value;
		this.setState({
			...set
		});
	}
	loginIn() {
		if (this.state.email.length <= 0) {
			Msg.prompt(i18n.t("error.emailEmpty", this.props.lng));
			return;
		}
		if (this.state.password.length <= 0) {
			Msg.prompt(i18n.t("error.passwordEmpty", this.props.lng));
			return;
		}
		this.setState({
			btnType: 3
		});
		this.props
			.loginIn({
				email: this.state.email,
				password: this.state.password
			})
			.then(res => {
				if (res.code === 4000) {
					Msg.prompt(i18n.t("success.login", this.props.lng));

					this.props.closeSign();
					window.location.reload();
				} else {
					this.setState({
						btnType: 2
					});
				}
			});
	}
	render() {
		const {
			lng,
			closeSign,
			openEmail,
			openRegister,
			openForget,
			openFast,
			isForget
		} = this.props;
		const { btnType } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className={css(this.styles.magic)}>
								<div className="sign-inbox">
									<div className="sign-in">
										<i
											className="icon-close"
											onClick={closeSign}
										/>
										<div className="sign-in-content">
											<div className="sign-in-title">
												InWeCrypto
											</div>
											<div className="sign-in-item">
												<div className="item-name">
													{t(
														"signBox.signIn.user",
														lng
													)}:
												</div>
												<div className="item-input">
													<input
														onChange={e => {
															this.inputChange(
																"email",
																e
															);
														}}
														className="input"
														type="text"
														placeholder={t(
															"signBox.signIn.email",
															lng
														)}
													/>
												</div>
											</div>
											<div className="sign-in-item">
												<div className="item-name">
													{t(
														"signBox.signIn.password",
														lng
													)}:
												</div>
												<div className="item-input">
													<input
														onChange={e => {
															this.inputChange(
																"password",
																e
															);
														}}
														placeholder={t(
															"signBox.signIn.password",
															lng
														)}
														className="input"
														type={(() =>
															this.setPassType())()}
													/>
												</div>
												<i
													className={(() =>
														this.setIconClass())()}
													onClick={this.changePassType.bind(
														this
													)}
												/>
											</div>
											<div className="forget">
												<span onClick={openForget}>
													{t(
														"signBox.signIn.forget",
														lng
													)}
												</span>
											</div>
											<div className="btn-box">
												{btnType === 1 && (
													<a
														href="javascript:void(0)"
														className="signbtn disable"
													>
														{t(
															"signBox.signIn.signIn",
															lng
														)}
													</a>
												)}
												{btnType === 2 && (
													<a
														href="javascript:void(0)"
														className="signbtn"
														onClick={this.loginIn.bind(
															this
														)}
													>
														{t(
															"signBox.signIn.signIn",
															lng
														)}
													</a>
												)}
												{btnType === 3 && (
													<a
														href="javascript:void(0)"
														className="signbtn loading"
														onClick={this.loginIn.bind(
															this
														)}
													>
														{t(
															"signBox.signIn.signIn",
															lng
														)}...
													</a>
												)}
											</div>
											{/* <div className="fast-sign">
												<span onClick={openFast}>
													{t(
														"signBox.signIn.fast",
														lng
													)}
												</span>
											</div> */}
											<div className="go-register">
												<span
													className="register-text"
													onClick={openRegister}
												>
													{t(
														"signBox.signIn.register",
														lng
													)}
												</span>
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
export default SignIn;
