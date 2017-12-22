import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./index.less";
import Project from "./components/project/";
import InfoBox from "../components/infolist/";
import Banner from "./components/banner/";
import actions from "../../actions/";
import ProjectAll from "./components/projectall/";
import DownWallet from "../components/downwallet/";
class Home extends Component {
	constructor() {
		super();
		this.state = {
			showDownWallet: false
		};
	}
	componentWillMount() {
		this.props.getInfoListAction();
		this.props.getProjectListAction();
		this.props.getNewsListAction();
		this.props.getBannerListAction();
		let d = new Date();
		let q = {};
		q.year = d.getFullYear();
		q.month = d.getMonth() + 1;
		q.day = d.getDate();
		this.props.getCandyDataAction(q);
	}
	componentDidMount() {
		document.title = "首页";
	}
	closeDownWalletClick() {
		this.setState({
			showDownWallet: false
		});
	}
	showDownWalletClick() {
		this.setState({
			showDownWallet: true
		});
	}
	render() {
		let {
			infoList,
			projectList,
			newsList,
			bannerList,
			showMoreProject,
			changeProjectStateAction,
			candyData
		} = this.props;
		let project = projectList
			? projectList.filter(item => {
					if (item.type > 4) {
						return item;
					}
				})
			: null;
		return (
			<div>
				<div className="home-box container-main">
					<Project
						changeState={changeProjectStateAction}
						projectList={project}
					/>
					<div className="home1 ui-box">
						<div className="group left">
							<h2 className="title">24H NEWS</h2>
							<div className="newslist-box">
								{newsList &&
									newsList.length > 0 &&
									newsList.map((item, index) => {
										return (
											<Link
												to={{
													pathname: "news-detail",
													search: "?id=" + item.id
												}}
												key={index}
												className="news-item"
											>
												<h3 className="news-item-titme">
													{item.title}
												</h3>
												<div className="news-item-desc">
													{item.desc}
												</div>
												<div className="news-item-time">
													{item.created_at}
												</div>
											</Link>
										);
									})}
							</div>
						</div>
						<div className="group right">
							<Banner bannerList={bannerList} />
						</div>
					</div>
				</div>
				<div className="infolist-box">
					<InfoBox
						showDownWallet={this.showDownWalletClick.bind(this)}
						showCandyBowl={true}
						showWallet={true}
						candyData={candyData}
						infoList={infoList}
					/>
				</div>
				{showMoreProject && (
					<ProjectAll
						changeState={changeProjectStateAction}
						projectList={project}
					/>
				)}
				{this.state.showDownWallet && (
					<DownWallet
						closeMethod={this.closeDownWalletClick.bind(this)}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		infoList: state.homeInfo.infoList,
		projectList: state.homeInfo.projectList,
		newsList: state.homeInfo.newsList,
		bannerList: state.homeInfo.bannerList,
		showMoreProject: state.homeInfo.showMoreProject,
		candyData: state.homeInfo.candyData
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getInfoListAction: actions.getInfoListAction(dispatch),
		getProjectListAction: actions.getProjectListAction(dispatch),
		getNewsListAction: actions.getNewsListAction(dispatch),
		getBannerListAction: actions.getBannerListAction(dispatch),
		changeProjectStateAction: actions.changeProjectStateAction(dispatch),
		getCandyDataAction: actions.getCandyDataAction(dispatch)
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
