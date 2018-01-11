import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class SignIn extends PureComponent {
	constructor() {
		super();
		this.state = {
			showPassword: false
		};
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
	setIconClass() {
		return this.state.showPassword ? "icon-see show-text" : "icon-see";
	}
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-in">
						<i className="icon-close" />
						<div className="sign-in-content">
							<div className="sign-in-title">InWeCrypto</div>
							<div className="sign-in-item">
								<div className="item-name">
									{t("signBox.signIn.user", lng)}:
								</div>
								<div className="item-input">
									<input
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
									{t("signBox.signIn.password", lng)}:
								</div>
								<div className="item-input">
									<input
										className="input"
										type={(() => this.setPassType())()}
									/>
								</div>
								<i
									className={(() => this.setIconClass())()}
									onClick={this.changePassType.bind(this)}
								/>
							</div>
							<div className="forget">
								<span>{t("signBox.signIn.forget", lng)}</span>
							</div>
							<div className="btn-box">
								<a
									href="javascript:void(0)"
									className="signbtn"
								>
									{t("signBox.signIn.forget", lng)}
								</a>
							</div>
							<div className="fast-sign">
								<span>{t("signBox.signIn.fast", lng)}</span>
							</div>
							<div className="go-register">
								<span className="register-text">
									{t("signBox.signIn.register", lng)}
								</span>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default SignIn;
