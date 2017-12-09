import "./index.less";
import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Inews extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showVideoAll: false,
			showImgTxtAll: false
		};
		this.changeVideoShow = this.changeVideoShow.bind(this);
		this.changeImgTxtShow = this.changeImgTxtShow.bind(this);
	}
	changeVideoShow() {
		this.setState({
			showVideoAll: true
		});
	}
	changeImgTxtShow() {
		this.setState({
			showImgTxtAll: true
		});
	}
	setUrl(url, id) {
		if (!url || url.length == 0) {
			return "../all-info-detail-page/#/?id=" + id;
		}
		if (url.indexOf("../") != -1) {
			return url.substring(4, url.length);
		} else {
			return url;
		}
	}
	render() {
		let { videoList, imgTxtList, inewsIndex, handClick } = this.props;
		const curClass = idx => {
			return idx === inewsIndex ? "inews-navbtn cur" : "inews-navbtn";
		};
		return (
			<div className="inews">
				<div className="inews-title">INEW报道</div>
				<div className="inews-container">
					<div className="inews-nav">
						{videoList &&
							imgTxtList &&
							videoList.length > 0 &&
							imgTxtList.length > 0 && (
								<div className="inews-navbox">
									<span
										className={curClass(0)}
										onClick={handClick.bind(this, 0)}
									>
										视频
									</span>
									<span
										className={curClass(1)}
										onClick={handClick.bind(this, 1)}
									>
										图文
									</span>
								</div>
							)}
					</div>
					<div className="inews-list">
						{inewsIndex == 0 && (
							<div>
								{videoList &&
									videoList.length > 0 &&
									videoList.map((item, index) => {
										if (
											!this.state.showVideoAll &&
											index >= 3
										) {
											return null;
										}
										return (
											<Link
												to={{
													pathname: "/news-detail",
													search: "?id=" + item.id
												}}
												className="inews-item"
												key={index}
											>
												<div className="img-box">
													<img src="" className="" />
												</div>
												<div className="inews-cont">
													<div className="item-title">
														{item.title}
													</div>
													<div className="item-desc">
														{item.desc}
													</div>
													<div className="item-time">
														{item.created_at}
													</div>
												</div>
											</Link>
										);
									})}
								{!this.state.showVideoAll &&
									videoList &&
									videoList.length > 3 && (
										<div
											className="morebtn"
											onClick={this.changeVideoShow}
										/>
									)}
							</div>
						)}
						{inewsIndex == 1 && (
							<div>
								{imgTxtList &&
									imgTxtList.length > 0 &&
									imgTxtList.map((item, index) => {
										if (!this.state.showAll && index >= 3) {
											return null;
										}
										return (
											<Link
												to={{
													pathname: "/news-detail",
													search: "?id=" + item.id
												}}
												className="inews-item"
												key={index}
											>
												<div className="img-box">
													<img
														src={item.img}
														className=""
													/>
												</div>
												<div className="inews-cont">
													<div className="item-title">
														{item.title}
													</div>
													<div className="item-desc">
														{item.desc}
													</div>
													<div className="item-time">
														{item.update}
													</div>
												</div>
											</Link>
										);
									})}
								{!this.state.showImgTxtAll &&
									imgTxtList &&
									imgTxtList.length > 3 && (
										<div
											className="morebtn"
											onClick={this.changeImgTxtShow}
										/>
									)}
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
