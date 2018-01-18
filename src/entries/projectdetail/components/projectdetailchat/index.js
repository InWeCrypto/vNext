import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "./index.less";
class ProjectDetailIco extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			score: 4,
			realScore: 4,
			isModify: true
		};
	}
	checkStar(index) {
		if (this.state.isModify) {
			this.setState({
				score: index + 1,
				realScore: index + 1,
				isModify: false
			});
		}
	}
	toggleStar(index, type) {
		if (this.state.isModify) {
			if (type == "over") {
				// 移入
				this.setState({
					score: index + 1
				});
			} else if (type == "out") {
				this.setState({
					score: this.state.realScore
				});
			}
		}
	}
	render() {
		const { lng, changeLng } = this.props;
		const { score, realScore } = this.state;
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
								{[1, 2, 3, 4, 5].map((item, index) => {
									return (
										<b
											key={index}
											className={
												index < score ? "cur" : ""
											}
											onClick={() => {
												this.checkStar(index);
											}}
											onMouseOver={() => {
												this.toggleStar(index, "over");
											}}
											onMouseOut={() => {
												this.toggleStar(index, "out");
											}}
										/>
									);
								})}
							</p>
							<b className="scoreNums">{realScore}</b>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIco;
