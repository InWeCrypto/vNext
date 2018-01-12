import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
import defaultHeader from "../../../../assets/images/member_img.png";
class MemberSet extends PureComponent {
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="member-set">
						<div className="member-title">
							<div className="member-header-box">
								<div className="member-img-box">
									<img src={defaultHeader} />
								</div>
							</div>
						</div>
						<div className="memberset-cont">
							<div className="memberset-group">
								<div className="memberset-item">
									<div className="memberset-i ui center">
										<div className="key">
											{t("member.memberset.email", lng)}:
										</div>
										<div className="value f1">yxyxy</div>
									</div>
								</div>
							</div>
							<div className="memberset-group">
								<div className="memberset-item">
									<div className="memberset-i ui center">
										<div className="key">
											{t(
												"member.memberset.nickName",
												lng
											)}:
										</div>
										<div className="value ctrl f1 ui center">
											<div className="f1">sss</div>
											<span className="ctrlbtn">
												{t(
													"member.memberset.ctrl",
													lng
												)}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className="memberset-group">
								<div className="memberset-item">
									<div className="memberset-i ui center">
										<div className="key">
											{t(
												"member.memberset.password",
												lng
											)}:
										</div>
										<div className="value ctrl f1 ui center">
											<div className="f1">sss</div>
											<span className="ctrlbtn">
												{t(
													"member.memberset.ctrl",
													lng
												)}
											</span>
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
export default MemberSet;
