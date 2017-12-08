import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/";
import "./index.less";

import RealTime from "./component/realtime/";
class Project extends Component {
	componentWillMount() {
		document.title = "项目详情";
	}
	async componentDidMount() {
		let q = util.getQuery(window.location.href);
		let detail = await this.props.getProjectDetailAction({
			id: q.id
		});
		if (detail.project_markets && detail.project_markets.length > 0) {
			detail.project_markets.map((item, index) => {
				this.props.getMarketDataAction({
					type: item.name,
					url: item.url
				});
			});
		}
	}
	setType(t) {
		if (!t || t <= 4) {
			reutrn;
		}
		switch (t) {
			case 5:
				return "上线中";
			case 6:
				return "待上线";
			case 7:
				return "众筹中";
			case 8:
				return "即将众筹";
		}
	}
	render() {
		const { projectDetail, marketData } = this.props;
		return (
			<div className="project-detail">
				<div className="project-left">
					<div className="project-info">
						{projectDetail && (
							<div className="project-title-box">
								<h2 className="h2">{projectDetail.name}</h2>
								<h3>22</h3>
								<div className="project-state">
									{this.setType(projectDetail.type)}
								</div>
							</div>
						)}
						{projectDetail && (
							<RealTime
								typeList={projectDetail}
								marketData={marketData}
							/>
						)}
					</div>
				</div>
				<div className="project-right">11</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		projectDetail: state.projectData.projectDetail,
		marketData: state.projectData.marketData
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getProjectDetailAction: actions.getProjectDetailAction(dispatch),
		getMarketDataAction: actions.getMarketDataAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Project)
);
