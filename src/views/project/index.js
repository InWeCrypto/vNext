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
		if (
			detail.project_time_prices &&
			detail.project_time_prices.length > 0
		) {
			detail.project_time_prices.map((item, index) => {
				this.props.getTimePriceAction({
					type: item.name,
					url: item.current_url
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
		const { projectDetail, timePrice } = this.props;
		return (
			<div className="project-detail">
				<div className="project-left">
					<div className="project-info">
						{projectDetail && (
							<div className="project-title-box">
								<h2 className="h2">{projectDetail.name}</h2>
								{/* <h3>22</h3> */}
								<div className="project-state">
									{this.setType(projectDetail.type)}
								</div>
							</div>
						)}
						{projectDetail &&
							timePrice && (
								<RealTime
									website={projectDetail.website}
									typeList={projectDetail.project_time_prices}
									timePrice={timePrice}
								/>
							)}
						<div className="box2">
							<div className="box2-nav">
								<span className="nav-item cur">K线</span>
								<span className="nav-item">交易市场</span>
							</div>
							<div className="k-box">
								<div className="k-nav">
									<span className="k-navbtn">5m</span>
									<span className="k-navbtn">15m</span>
									<span className="k-navbtn">30m</span>
									<span className="k-navbtn">1h</span>
									<span className="k-navbtn">2h</span>
									<span className="k-navbtn">4h</span>
									<span className="k-navbtn">6h</span>
									<span className="k-navbtn">1d</span>
									<span className="k-navbtn">1w</span>
								</div>
								<div className="k-content" />
							</div>
						</div>
					</div>
				</div>
				<div className="project-right" />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		projectDetail: state.projectData.projectDetail,
		timePrice: state.projectData.timePrice
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getProjectDetailAction: actions.getProjectDetailAction(dispatch),
		getTimePriceAction: actions.getTimePriceAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Project)
);
