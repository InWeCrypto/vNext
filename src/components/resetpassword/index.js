import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class ResetPassword extends PureComponent {
	constructor() {
		super();
		this.state = {
			password1: "",
			isShowPass1: false,
			password2: "",
			isShowPass2: false,
			isShowError: false
		};
	}
	inpputChange(type, e) {
		var val = e.target.value;
		this.setState({
			[type]: val
		});
	}
	changePassShow(type) {
		let s = !this.state[type];
		this.setState({
			[type]: s
		});
	}
	render() {
		const { lng } = this.props;
		const { isShowPass1, isShowPass2, isShowError } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="resetp-box">
						<div className="resetp-bg" />
						<div className="resetp-cont">
							<div className="resetp-container">
								<i className="icon-close" />
								<div className="resetp-title">
									{t("resetPassword.title", lng)}
								</div>
								<div className="resetp-group">
									<div className="resetp-item center ui">
										<div className="key">
											{t("resetPassword.t1", lng)}:
										</div>
										<div className="value ui center f1">
											<div className="f1">
												<input
													type={(() =>
														isShowPass1
															? "text"
															: "password")()}
													onChange={e => {
														this.inpputChange(
															"password1",
															e
														);
													}}
												/>
											</div>
											<i
												className={(() =>
													isShowPass1
														? "icon-see show-text"
														: "icon-see")()}
												onClick={() => {
													this.changePassShow(
														"isShowPass1"
													);
												}}
											/>
										</div>
									</div>
									<div className="resetp-item center ui">
										<div className="key">
											{t("resetPassword.t2", lng)}:
										</div>
										<div className="value ui center f1">
											<div className="f1">
												<input
													type={(() =>
														isShowPass2
															? "text"
															: "password")()}
													onChange={e => {
														this.inpputChange(
															"password2",
															e
														);
													}}
												/>
											</div>
											<i
												onClick={() => {
													this.changePassShow(
														"isShowPass2"
													);
												}}
												className={(() =>
													isShowPass2
														? "icon-see show-text"
														: "icon-see")()}
											/>
										</div>
									</div>
								</div>
								<div className="resetp-btn">
									<div>
										<span className="btn">
											{t("resetPassword.btn", lng)}
										</span>
									</div>
									{isShowError && (
										<div className="resetp-error">22</div>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ResetPassword;
