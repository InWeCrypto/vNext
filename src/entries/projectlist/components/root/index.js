import React, { PureComponent } from "react";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.less";

export default class Root extends PureComponent {
	componentDidMount() {
		this.props.getProjectList();
		let minH = getMainMinHeight();
		this.setState({
			minH: minH
		});
		this.refs.mainBox.style.height = minH + "px";
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		return (
			<div className="container">
				<Header />
				<div ref="mainBox" className="projectList ui">
					<div className="projectListReturn ui center">
						<span />
					</div>
					<div className="projectListCon ui">
						{[1, 2, 3, 4].map((item, index) => {
							return (
								<div
									key={index}
									className="projectListConChild"
								>
									<div className="projectListConChildTitle">
										<span className="ellitext">
											Trading
										</span>
									</div>
									<ul className="projectListConChildUl">
										<li>
											<div className="projectListLiTop ui center">
												<div className="projectListLiTopLeft ui center">
													<div className="projectListImg newMsg">
														<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515589318224&di=6418f077b77d7451a1246c6cfe793406&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131124%2F6608733_084856944000_2.jpg" />
													</div>
													<p>
														<span className="ellitext">
															NEO
														</span>
														<b className="ellitext">
															(neo)
														</b>
													</p>
												</div>
												<div
													className={
														index == 4
															? "projectListLiTopRight collect"
															: "projectListLiTopRight nocollect"
													}
												/>
											</div>
											<div className="projectListLiCenter">
												<div className="left">
													Blockchain
												</div>
												<div className="right">
													$90.00<span>(-12.00%)</span>
												</div>
											</div>
										</li>
										<li>
											<div className="projectListLiTop ui center">
												<div className="projectListLiTopLeft ui center">
													<div className="projectListImg newMsg">
														<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1515589318224&di=6418f077b77d7451a1246c6cfe793406&imgtype=0&src=http%3A%2F%2Fpic36.nipic.com%2F20131124%2F6608733_084856944000_2.jpg" />
													</div>
													<p>
														<span className="ellitext">
															NEO
														</span>
														<b className="ellitext">
															(neo)
														</b>
													</p>
												</div>
												<div
													className={
														index == 2
															? "projectListLiTopRight collect"
															: "projectListLiTopRight nocollect"
													}
												/>
											</div>
											<div className="projectListLiCenter">
												<div className="left">
													Blockchain
												</div>
												<div className="right">
													$90.00<span>(-12.00%)</span>
												</div>
											</div>
										</li>
									</ul>
									<div className="projectListConChildMore">
										<span className="ellitext">
											大约还有14个项目等你发现
										</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}
