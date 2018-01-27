import React, { PureComponent } from "react";
import webUploader from "../../../../assets/js/webuploader.min.js";
import { I18n, Trans } from "react-i18next";
import { getLocalItem, setLocalItem } from "../../../../utils/util";
import "./index.less";
import defaultHeader from "../../../../assets/images/member_img.png";
import shape from "../../../../assets/images/shape.png";
class MemberSet extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			isEditNickName: false,
			oldText: props.userInfo.name,
			newText: ""
		};
	}
	componentWillReceiveProps(nextProps) {}
	uploader(data) {
		const option = data;
		if (!option) {
			return;
		}
		let uploader = webUploader.create({
			auto: true,
			pick: {
				id: "#ban_uploader",
				multiple: false
			},
			formData: {
				key: option.dir + option.expire + "${filename}",
				host: option.host,
				policy: option.policy,
				Signature: option.signature,
				callback: "",
				OSSAccessKeyId: option.accessid
			},
			server: option.host,
			method: "POST",
			accept: {
				extensions: "jpg,jpeg,bmp,png",
				mimeTypes: "image/jpg,image/jpeg,image/png,image/bmp"
			}
		});
		uploader.on("fileQueued", file => {
			option.filename = file.name;
		});
		uploader.on("uploadSuccess", res => {
			var imgAdd =
				option.host +
				"/" +
				option.dir +
				option.expire +
				option.filename;
			this.props.uploadHeader(imgAdd);
			let item = JSON.parse(getLocalItem("userInfo").data);
			item.img = imgAdd;
			setLocalItem("userInfo", JSON.stringify(item));
		});
	}
	componentDidMount() {
		this.props.getUploadKey("img").then(res => {
			if (res.code === 4000) {
				this.uploader(res.data);
			}
		});
	}
	openResetPass(data) {
		this.props.openResetPass(data);
	}
	changeEdit(state) {
		let set = {
			isEditNickName: state
		};
		if (state) {
			set.newText = this.state.oldText;
		}
		if (!state) {
		}
		this.setState({
			...set
		});
	}
	newText(e) {
		this.setState({
			newText: e.target.value
		});
	}
	resetNick() {
		if (this.state.newText.length <= 0) {
			Msg.prompt(i18n.t("member.resetNickLenth", this.props.lng));
			return;
		}
		this.props
			.resetNick({
				name: this.state.newText
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						oldText: this.state.newText,
						isEditNickName: false
					});
				}
			});
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
									<img
										src={
											userInfo.img
												? userInfo.img
												: defaultHeader
										}
									/>
									<div className="camer">
										<img src={shape} />
									</div>
									<div id="ban_uploader" />
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
												<span
													onClick={this.changeEdit.bind(
														this,
														true
													)}
													className="ctrlbtn"
												>
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
													<input
														value={
															this.state.newText
														}
														onChange={e => {
															this.newText(e);
														}}
														className="newText"
														type="text"
													/>
												</div>
												<span
													onClick={this.changeEdit.bind(
														this,
														false
													)}
													className="ctrlbtn"
												>
													{t("cannel", lng)}
												</span>
												<span
													onClick={this.resetNick.bind(
														this
													)}
													className="ctrlbtn sure"
												>
													{t("sure", lng)}
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
