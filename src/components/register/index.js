import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class Register extends PureComponent {
	render() {
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="register-box">
						<div className="register-title">
							<i className="icon-return" />
							InWeCrypto
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default Register;
