import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class ProjectCollection extends PureComponent {
	componentDidMount() {
		setTimeout(() => {
			let boxH = document.querySelector("#memberProject").offsetHeight;
			let pageH = document.querySelector("#memberPagationBox")
				.offsetHeight;
			document.querySelector("#memberListBox").style.height =
				boxH - pageH + "px";
		}, 0);
	}
	render() {
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="memberProject" className="project-collect">
						<div id="memberListBox" className="member-list">
							<div className="member-name">
								<span className="t1">Hello,</span>
								<span className="t2">dasdas</span>
							</div>
							<div className="project-group ui center">
								<i className="icon-collect" />
								<div className="project-icon">
									<img src="https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=4049754232,2548799720&fm=173&s=4695158C53FB178A782965910300E08B&w=218&h=146&img.JPEG" />
								</div>
								<div className="project-name">Bitcoin</div>
								<div className="project-market">
									<div>
										<span className="t1">$232</span>
										<span className="t2">(+111.00%)</span>
										<i />
									</div>
									<div>2233</div>
								</div>
								<div className="f1">222</div>
							</div>
						</div>
						<div id="memberPagationBox" className="pagination-box">
							<Pagination efaultCurrent={5} total={500} />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectCollection;
