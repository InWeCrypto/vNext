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
								<div className="item-name">账号:</div>
								<div className="item-input">
									<input className="input" type="text" />
								</div>
							</div>
							<div className="sign-in-item">
								<div className="item-name">密码:</div>
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
								<span>忘记密码</span>
							</div>
							<div className="btn-box">
								<a
									href="javascript:void(0)"
									className="signbtn"
								>
									登录
								</a>
							</div>
							<div className="fast-sign">
								<span>InWe Wallet账号快捷登录</span>
							</div>
							<div className="go-register">
								<span className="register-text">注册</span>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default SignIn;
