import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class FastSign extends PureComponent {
	render() {
		const { lng, close } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="sign-box">
						<div className="sign-content">
							<div className="sign-bg" />
							<div className="sign-inbox">
								<div className="fastsign-box">
									<div className="fastsign-title">
										<i
											className="icon-return"
											onClick={close}
										/>
										InWeCrypto
									</div>
									<div className="fastsign-qcode">
										<img
											className="img"
											src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2162811911,2962770632&fm=173&s=5E7528C404433D530A705D910300C080&w=218&h=146&img.JPEG"
										/>
									</div>
									<div className="t1">
										{t("signBox.fastSign.text", lng)}
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
export default FastSign;
