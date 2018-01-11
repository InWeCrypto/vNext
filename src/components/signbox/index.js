import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import SignIn from "../signin/";
import "./index.less";

class SignBox extends PureComponent {
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className="sign-inbox">
								<SignIn lng={lng} />
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default SignBox;
