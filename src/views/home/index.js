import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./index.less";
import Project from "./components/project/";
import InfoBox from "./components/infolist/";
import Banner from "./components/banner/";
import actions from "../../actions/";
class Home extends Component {
	componentWillMount() {
		this.props.getInfoListAction();
		this.props.getProjectListAction();
		this.props.getNewsListAction();
		this.props.getBannerListAction();
	}
	render() {
		let { infoList, projectList, newsList, bannerList } = this.props;
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
						<div className="item">
							<h2 className="title">24H NEWS</h2>
							{newsList &&
								newsList.length > 0 &&
								newsList.map((item, index) => {
									return (
										<div key={index} className="news-item">
											<h3 className="news-item-titme">
												{item.title}
											</h3>
											<div className="news-item-desc">
												{item.desc}
											</div>
											<div className="news-item-time">
												{item.created_at}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="group right">
						<Banner bannerList={bannerList} />
					</div>
				</div>
				<InfoBox infoList={infoList} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		infoList: state.homeInfo.infoList,
		projectList: state.homeInfo.projectList,
		newsList: state.homeInfo.newsList,
		bannerList: state.homeInfo.bannerList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getInfoListAction: actions.getInfoListAction(dispatch),
		getProjectListAction: actions.getProjectListAction(dispatch),
		getNewsListAction: actions.getNewsListAction(dispatch),
		getBannerListAction: actions.getBannerListAction(dispatch)
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
