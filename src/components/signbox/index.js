import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import SignIn from "../signin/";
import FastSign from "../fastsign/";
import Register from "../register/";
import EmailCode from "../emailcode/";
import ResetPassword from "../resetpassword/";
import "./index.less";

class SignBox extends PureComponent {
	changeSignType(type, value) {
		this.props.changeSignType(type, value);
	}
	closeEmailBox() {
		this.props.changeSignType("showSendEmail", false);
	}
	closeSignIn() {
		this.closeSign;
	}
	render() {
		const {
			lng,
			register,
			signin,
			fastSign,
			showLogin,
			showSendEmail,
			closeSign,
			loginToEmail
		} = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className="sign-inbox">
								{/* <FastSign lng={lng} /> */}
								{/* <Register Register lng={lng} /> */}
								{/* <ResetPassword /> */}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default SignBox;
