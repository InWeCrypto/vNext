import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class MemberMessage extends PureComponent {
	componentDidMount() {
		setTimeout(() => {
			let boxH = document.querySelector("#memberMessage").offsetHeight;
			let pageH = document.querySelector("#memberPagationBox")
				.offsetHeight;
			document.querySelector("#memberListBox").style.height =
				boxH - pageH + "px";
		}, 0);
	}
	render() {
		const { lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="memberMessage" className="member-message">
						<div id="memberListBox">
							<div className="member-group center ui">
								<div className="message-icon ui center jcenter">
									<i className="icon-message" />
									<i className="icon-circle" />
								</div>
								<div className="f1 message-text">
									撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声撒多撒撒大声地撒多撒撒大声地撒多撒撒大声撒多撒撒大声地撒多撒撒大声地撒多撒撒大声撒多撒撒大声地撒多撒撒大声地撒多撒撒大声撒多撒撒大声地撒多撒撒大声地撒多撒撒大声撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒撒大声地撒多撒
								</div>
								<div className="time">2018-11-11 11:11:11</div>
							</div>
						</div>
						<div id="memberPagationBox" className="pagation-box">
							<Pagination defaultCurrent={5} total={500} />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default MemberMessage;
