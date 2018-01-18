import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
import defaultHeader from "../../../../assets/images/member_img.png";
class MemberSet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isEditNickName: false,
			oldText: props.userInfo.name,
			newText: ""
		};
	}
	openResetPass(data) {
		this.props.openResetPass(data);
	}
	render() {
		const { lng, userInfo } = this.props;
		const { isEditNickName } = this.state;
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
										<div className="value f1">
											{userInfo && userInfo.email}
										</div>
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
										{!isEditNickName && (
											<div className="value ctrl f1 ui center">
												<div className="f1">
													{this.state.oldText}
												</div>
												<span className="ctrlbtn">
													{t(
														"member.memberset.ctrl",
														lng
													)}
												</span>
											</div>
										)}
										{isEditNickName && (
											<div className="value ctrl f1 ui center">
												<div className="f1">
													{this.state.oldText}
												</div>
												<span className="ctrlbtn">
													{t(
														"member.memberset.ctrl",
														lng
													)}
												</span>
											</div>
										)}
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
											<div className="f1">******</div>
											<span
												className="ctrlbtn"
												onClick={this.openResetPass.bind(
													this,
													true
												)}
											>
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
