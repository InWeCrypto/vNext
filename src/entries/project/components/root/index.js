import React, { PureComponent } from "react";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import "./index.less";

export default class Root extends PureComponent {
	componentDidMount() {
		this.props.getProjectList();
	}
	render() {
		return (
			<div className="container">
				<Header />
				<div className="project ui">
					<div style={{ width: 582, backgroundColor: "#C9C6C6" }} />
					<div className="projectContent f1">
						<ul className="ui">
							<li>
								<div className="projectLiTop ui center">
									<div className="projectLiTopLeft ui center">
										<img src="" />
										<span>NEO</span>
										<b>(neo)</b>
									</div>
									<div className="projectLiTopRight nocollect" />
								</div>
								<div className="projectLiType">
									<span>Blockchain</span>
								</div>
								<div className="projectLiDesc">
									<p className="ellitext">
										高盛将构建加密货币交易平台
									</p>
								</div>
								<div className="projectLiImg">
									<img src="" alt="" />
								</div>
								<div className="projectLiDate">
									2017-11-16 11:35:33 copy
								</div>
							</li>
							<li>1</li>
							<li>1</li>
							<li>1</li>
							<li>
								<div className="projectLiTop ui center">
									<div className="projectLiTopLeft ui center">
										<img src="" />
										<span>NEO</span>
										<b>(neo)</b>
									</div>
									<div className="projectLiTopRight collect" />
								</div>
							</li>
							<li>1</li>
							<li>1</li>
							<li>1</li>
						</ul>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
