import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "./index.less";
class ProjectDetailIco extends PureComponent {
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailChat">
						<ul className="chatUl">
							<li>
								<p>
									<span>assafsasson:</span>
									people are stupid for sellingtheir srn or so
									cheap now :)
								</p>
							</li>
							<li>
								<p>
									<span>assafsasson:</span>
									people are stupid for sellingtheir srn or so
									cheap now :)
								</p>
							</li>
							<li>
								<p>
									<span>assafsasson:</span>
									people are stupid for sellingtheir srn or so
									cheap now :)
								</p>
							</li>
						</ul>
						<div className="sendChat">
							<input type="text" placeholder="你的观点…" />
						</div>
						<div className="score ui center jcenter">
							<span>项目评分：</span>
							<p className="starList ui">
								<b className="cur" />
								<b className="cur" />
								<b className="cur" />
								<b className="cur" />
								<b />
							</p>
							<b className="scoreNums">4</b>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIco;
