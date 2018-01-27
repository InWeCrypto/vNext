import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getLocalItem } from "../../../../utils/util";
import { Link } from "react-router-dom";
import "./index.less";
class ProjectDetailIco extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.projectDetail.id,
			score: 0,
			realScore: 0,
			isModify: true
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.initPage();
		}, 0);
	}
	componentWillReceiveProps(nextProps) {
		this.initPage();
	}
	initPage() {
		if (
			this.props.projectDetail.category_user &&
			this.props.projectDetail.category_user.score != "0"
		) {
			this.setState({
				isModify: false,
				score: this.props.projectDetail.category_user.score,
				realScore: this.props.projectDetail.category_user.score
			});
		}
	}
	checkStar(index) {
		let user = getLocalItem("userInfo");
		if (!user || !user.data) {
			window.headerBox.setState({
				showLogin: true
			});
			return;
		}
		if (this.state.isModify) {
			this.props
				.getProjectScore({
					c_id: 7,
					score: "4"
				})
				.then(res => {
					this.setState({
						score: index + 1,
						realScore: index + 1,
						isModify: false
					});
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
	showApp() {
		let trunapp = window.CtrunappAdvHide;
		if (trunapp && IsTouchDevice) {
			trunapp.setState({
				advHide: false
			});
		}
	}
	render() {
		const { lng, changeLng, projectDetail, getProjectScore } = this.props;
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
							<input
								onFocus={this.showApp.bind(this)}
								type="text"
								placeholder={t("projectDetail.chat", lng)}
							/>
						</div>
						<div className="score ui center jcenter">
							<span>{t("projectDetail.score", lng)}：</span>
							<p
								className="starList ui"
								onClick={this.showApp.bind(this)}
							>
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
							<b className="scoreNums">{score}</b>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIco;
