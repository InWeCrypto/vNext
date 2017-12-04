import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.less";
import Project from "./components/project/";
import InfoBox from "./components/infolist";
import actions from "../../actions/";
class Home extends Component {
	componentWillMount() {
		this.props.getInfoListAction();
		this.props.getProjectListAction();
	}
	render() {
		let { infoList, projectList } = this.props;
		let project = projectList
			? projectList.filter(item => {
					if (item.type > 4) {
						return item;
					}
				})
			: null;
		return (
			<div className="home-box container">
				<Project projectList={project} />
				<div className="home1 ui-box">
					<div className="group left">
						<div className="item">1</div>
					</div>
					<div className="group right">2</div>
				</div>
				<InfoBox infoList={infoList} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		infoList: state.homeInfo.infoList,
		projectList: state.homeInfo.projectList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getInfoListAction: actions.getInfoListAction(dispatch),
		getProjectListAction: actions.getProjectListAction(dispatch)
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
