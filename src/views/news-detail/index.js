import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./index.less";
import actions from "../../actions/";
import { setTimeout } from "timers";
import playbtn from "../../lib/images/playvideo.png";
var player = null;
class NewsDetail extends Component {
	constructor() {
		super();
		this.state = {
			id: null,
			isShowVideo: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			let q = util.getQuery(window.location.href);
			this.setState({
				id: q.id
			});
			this.props.getNewsDetailAction({
				id: q.id
			});
		}
	}
	componentWillMount = () => {
		document.title = "详情";
		let q = util.getQuery(window.location.href);
		this.setState({
			id: q.id
		});
		this.props.getNewsDetailAction({
			id: q.id
		});
		this.props.getNewNewsListAction();
	};
	setType(t) {
		if (!t) {
			return;
		}
		switch (t) {
			case 1:
				return "快讯";
			case 2:
				return "图文";
			case 3:
				return "视频";
		}
	}
	playVideo(url) {
		this.setState({
			isShowVideo: true
		});
		if (!player) {
			player = new Aliplayer({
				id: "J_prismPlayer",
				width: "100%",
				autoplay: false,
				//支持播放地址播放,此播放优先级最高
				source: url,
				//播放方式二：点播用户推荐
				vid: "1e067a2831b641db90d570b6480fbc40",
				playauth: "",
				// cover:
				// 	"http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png",
				//播放方式三：仅MTS用户使用
				vid: "1e067a2831b641db90d570b6480fbc40",
				accId: "",
				accSecret: "",
				stsToken: "",
				domainRegion: "",
				authInfo: ""
			});
		}
	}
	closeVideo() {
		let video = document.querySelector("#J_prismPlayer").firstElementChild;
		if (video.tagName == "VIDEO") {
			video.pause();
		}
		this.setState({
			isShowVideo: false
		});
	}
	setVideoDemo() {
		return this.state.isShowVideo ? "video-box show" : "video-box";
	}
	render() {
		const { newsDetail, newNewsList } = this.props;
		return (
			<div className="news-detail">
				{newsDetail &&
					(() => {
						setTimeout(() => {
							let cont = this.refs.detailContent;
							cont.innerHTML = newsDetail.content;
						}, 1);
						return (
							<div className="detail-box">
								<h1 className="detail-title">
									{newsDetail.title}
								</h1>
								<div className="detail-time">
									{newsDetail.created_at}
								</div>
								{newsDetail.type === 3 && (
									<div ref="videoBtn" className="video">
										<div
											className="video-btn"
											onClick={() => {
												this.playVideo(
													newsDetail.video
												);
											}}
										>
											<img
												className="img"
												src={newsDetail.img}
												alt=""
											/>
											<div className="video-play">
												<img
													className="playbtn"
													src={playbtn}
												/>
											</div>
										</div>
									</div>
								)}
								<div
									ref="detailContent"
									className="detail-content"
								/>
							</div>
						);
					})()}
				{newNewsList && (
					<div className="news-more">
						<div className="news-more-top">
							<div className="left">更多资讯</div>
							{/* <div className="right">more></div> */}
						</div>
						<div className="news-more-list">
							{newNewsList.length > 0 &&
								newNewsList.map((item, index) => {
									return (
										<Link
											to={{
												pathname: "/news-detail",
												search: "?id=" + item.id
											}}
											key={index}
											className="news-more-item"
										>
											<div className="news-more-img">
												<img src={item.img} />
											</div>
											<div className="title">
												{item.title}
											</div>
											<div className="info">
												<span>{item.created_at}</span>
												<span className="news-more-type">
													{this.setType(item.type)}
												</span>
											</div>
										</Link>
									);
								})}
						</div>
					</div>
				)}
				<div className={this.setVideoDemo()}>
					<div
						onClick={this.closeVideo.bind(this)}
						className="video-bg"
					/>
					<div className="J_prismPlayer-box">
						<div id="J_prismPlayer" />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		newsDetail: state.newsDetailData.newsDetail,
		newNewsList: state.newsDetailData.newNewsList
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getNewsDetailAction: actions.getNewsDetailAction(dispatch),
		getNewNewsListAction: actions.getNewNewsListAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewsDetail)
);
