import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class EmailCode extends PureComponent {
	constructor() {
		super();
		this.state = {
			codeArr: [],
			code: "",
			isFocus: false
		};
	}
	inputEmailCode(e) {
		var value = e.target.value;
		if (value.length > 6) {
			return;
		}
		var arr = value.split("");
		this.setState({
			code: value,
			codeArr: arr
		});
	}
	InputFocus() {
		this.setState({
			isFocus: false
		});
	}
	setFocus() {
		document.querySelector("#emailCodeInputItem").focus();
		this.setState({
			isFocus: true
		});
	}
	render() {
		const { lng } = this.props;
		const { code, codeArr, isFocus } = this.state;
		const item = () => {
			let arr = [];
			for (let i = 0; i < 6; i++) {
				arr.push(
					<div
						key={i}
						className={(() =>
							isFocus && i == codeArr.length
								? "code-item cur"
								: "code-item")()}
					>
						{codeArr && codeArr[i] && codeArr[i]}
					</div>
				);
			}
			return arr;
		};
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="emailcode-box">
						<div className="emailcode-bg" />
						<div className="emailcode-content">
							<div className="emailcode-container">
								<i className="icon-close" />
								<div className="emailcode-title">修改密码</div>
								<div className="emailcode-send">
									<span>选择邮箱</span>
									<span className="orange">
										yx232@163.com
									</span>
									<span>
										进行登录密码的修改，
										APP的相关登录账号密码也会更改，
									</span>
									<span className="orange text-under">
										点此
									</span>
									<span>发送验证码</span>
								</div>
								<div
									className="emailcode-input"
									onClick={this.setFocus.bind(this)}
								>
									{item()}
								</div>
								<input
									className="emailcode-input-item"
									onChange={e => {
										this.inputEmailCode(e);
									}}
									id="emailCodeInputItem"
									ref="emailCodeInputItem"
									value={code}
									max-length="6"
									type="number"
									onBlur={this.InputFocus.bind(this)}
								/>
								<div className="emailcode-btn">
									<span className="emailsure">确定</span>
								</div>
								<div className="emailcode-error">错误</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default EmailCode;
