import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import QRCode from "../../assets/js/qcode";
import "./index.less";
class QcodeBox extends PureComponent {
	componentDidMount() {
		let url = this.props.url;
		setTimeout(() => {
			var box = document.getElementById("qrcode");
			var n = box.offsetWidth - 40;
			var qrcode = new QRCode(box, {
				width: n, //设置宽高
				height: n
			});
			qrcode.makeCode(url);
		}, 0);
	}
	render() {
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="qcodebox">
						<div
							className="qcodebox-cont"
							onClick={this.props.close}
						>
							<div className="qcode" id="qrcode" />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default QcodeBox;
