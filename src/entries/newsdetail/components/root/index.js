import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import origlePic from "../../../../assets/images/yuanchuang_pic.png";
import "./index.less";
import { platform } from "os";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-News";
		let minH = getMainMinHeight();
		let leftArrow = document.getElementById("newsDetailLeft").offsetLeft;
		document.getElementById("newsDetailRight").style.right =
			leftArrow + "px";
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(location) {
		let p = getQuery(location);
		if (p.art_id) {
			this.setState({
				art_id: p.art_id
			});
		}
		this.getNewsDetailContent(p.art_id);
	}
	componentDidUpdate() {
		this.textChange();
		this.creatVideo();
	}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			isShowImg: true,
			newsType: "video", // video img
			isJump: "", // yes no
			art_id: "",
			enable: false
		};
	}
	getNewsDetailContent(art_id) {
		this.props
			.getNewsDetail({
				art_id: art_id
			})
			.then(res => {
				if (res.code === 4000) {
					let enableBool = false;
					if (
						res.data.article_user &&
						res.data.article_user.user_id
					) {
						enableBool = true;
					} else {
						enableBool = false;
					}
					this.setState({
						art_id: res.data.id,
						newsType: res.data.type,
						enable: enableBool
					});
				}
			})
			.then(res => {
				this.getNewsComment();
			});
	}
	getNewsCollect(art_id) {
		this.props
			.getNewsDetailCollect({
				art_id: art_id,
				enable: !this.state.enable
			})
			.then(res => {
				if (res.code === 4000) {
					this.setState({
						enable: !this.state.enable
					});
				}
			});
	}
	getNewsComment() {
		this.props
			.getNewsDetailCommentL({
				art_id: this.state.art_id
			})
			.then(res => {
				if (res.code === 4000) {
					console.log(res);
				}
			});
	}
	inFocus() {
		this.setState({
			isShowImg: false
		});
	}
	outFocus() {
		this.setState({
			isShowImg: true
		});
	}
	textChange() {
		let obj = document.getElementById("textareaId");
		if (obj.value.length > 300) obj.value = obj.value.slice(0, 300);
		if (true) {
			obj.style.height = 0 + "px";
			obj.style.height =
				obj.clientHeight + obj.scrollHeight - obj.clientHeight + "px";
		}
	}
	textEmpty() {
		let obj = document.getElementById("textareaId");
		obj.value = "";
		this.textChange();
	}
	textSubmit() {
		let obj = document.getElementById("textareaId");
		this.props
			.getNewsDetailComment({
				art_id: this.state.art_id,
				content: obj.value
			})
			.then(res => {
				if (res.code === 4000) {
					obj.value = "";
					this.getNewsComment();
				}
			});
	}
	videoPlay() {
		this.setState({
			newsType: ""
		});
		if (this.state.isJump == "yes") {
			// 跳转
			window.open("www.baidu.com");
		} else {
			// 不跳转
			this.setState(
				{
					isJump: "no"
				},
				this.creatVideo()
			);
		}
	}
	creatVideo() {
		let script = document.createElement("script");
		script.src = "//g.alicdn.com/de/prismplayer/2.5.0/aliplayer-min.js";
		script.type = "text/javascript";
		let link = document.createElement("link");
		link.href =
			"//g.alicdn.com/de/prismplayer/2.5.0/skins/default/aliplayer-min.css";
		link.rel = "stylesheet";
		document.getElementsByTagName("head")[0].appendChild(link);
		document.getElementsByTagName("head")[0].appendChild(script);
		// window.onload = function() {
		if (this.state.isJump == "no") {
			var player = new Aliplayer(
				{
					id: "J_prismPlayer",
					width: "100%",
					autoplay: false,
					cover:
						"https://b-ssl.duitang.com/uploads/item/201801/10/20180110212314_ytxcG.thumb.700_0.jpeg",
					//支持播放地址播放,此播放优先级最高
					source: "http://abc.tanshikeji.com/video1.mp4"
				},
				function(player) {
					console.log("播放器创建好了。");
					console.log(player.play());
				}
			);
		}
		// };
	}
	render() {
		const { minH, enable } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			newsDetail,
			newsDetailCommentL
		} = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						{!IsTouchDevice && (
							<FixedMenu changeLng={changeLng} lng={lng} />
						)}

						<Header
							userInfo={userInfo}
							registerUser={registerUser}
							sendEmail={sendEmailCode}
							loginIn={loginIn}
							setReduxUserInfo={setReduxUserInfo}
							forgetUser={forgetUser}
							lng={lng}
						/>
						<div id="mainBox" className="newsDetail ui">
							<div
								id="newsDetailLeft"
								className={
									newsDetail.article_prev
										? "newsDetailLeft ui center show m-hide"
										: "newsDetailLeft ui center m-hide"
								}
							>
								{newsDetail.article_prev && (
									<Link
										to={{
											pathname: "newsdetail",
											search:
												"?art_id=" +
												newsDetail.article_prev.id
										}}
									>
										<span />
									</Link>
								)}
								{!newsDetail.article_prev && <span />}
							</div>

							<div className="newsDetailCon">
								<div className="newsDetailConTitle">
									<span>{newsDetail.title}</span>
								</div>
								<div className="newsMeta">
									<div className="newsDetailConMeta">
										<span className="metaDate">
											{newsDetail.updated_at}
										</span>
										{newsDetail.is_sole &&
											(IsTouchDevice ? (
												<img
													className="origlePic"
													src={origlePic}
												/>
											) : (
												<span className="metaCategory">
													原创
												</span>
											))}
										{newsDetail &&
											newsDetail.article_category_cc &&
											newsDetail.article_category_cc
												.length > 0 &&
											newsDetail.article_category_cc.map(
												(item, index) => {
													return (
														<Link
															key={index}
															to={{
																pathname:
																	"/projectdetail/" +
																	item
																		.category
																		.id
															}}
														>
															<img
																src={
																	item
																		.category
																		.img
																}
																alt={
																	item
																		.category
																		.name
																}
															/>
														</Link>
													);
												}
											)}
									</div>
									<div className="newDetailConShare">
										<span>
											<b className="wxShare" />
										</span>
										<span>
											<b
												className={
													enable
														? "collect active"
														: "collect"
												}
												onClick={() => {
													this.getNewsCollect(
														newsDetail.id
													);
												}}
											/>
										</span>
									</div>
								</div>
								<div className="newsDetailBox">
									{/* 视频 */}
									{this.state.isJump == "no" && (
										<div
											className="prism-player"
											id="J_prismPlayer"
										/>
									)}
									{this.state.newsType == 3 && (
										<div className="videoType">
											<img
												src="https://b-ssl.duitang.com/uploads/item/201801/10/20180110212314_ytxcG.thumb.700_0.jpeg"
												alt=""
											/>
											<b
												id="videoPlay"
												onClick={() => {
													this.videoPlay();
												}}
											/>
										</div>
									)}

									<div className="newsDetailContent">
										{newsDetail.content}

										{this.state.newsType == 2 && (
											<img
												src="http://img4.imgtn.bdimg.com/it/u=4004954884,1272926999&fm=214&gp=0.jpg"
												alt=""
											/>
										)}
									</div>
									<p className="newsReadNums">
										{newsDetail.click_rate}人已读
									</p>
								</div>
								<div className="newsDetailComment">
									<div className="newsDetailCommentNums">
										<b>{newsDetail.comment_count}</b>条评论
									</div>
									<div className="newsDetailCommmentBox">
										<div className="newsDetailCommentBoxCenter ui center">
											{this.state.isShowImg &&
												!IsTouchDevice && (
													<div className="newsDetailHeadImg">
														<img
															src={
																userInfo &&
																userInfo.img
															}
															alt=""
														/>
													</div>
												)}
											<textarea
												name=""
												id="textareaId"
												placeholder="说点什么..."
												onFocus={() => {
													this.inFocus();
												}}
												onBlur={() => {
													this.outFocus();
												}}
												onChange={() => {
													this.textChange();
												}}
											/>
										</div>
										<div className="newsDetailCommentBoxBtn clearfix m-hide">
											<span
												className="submit"
												onClick={() => {
													this.textSubmit();
												}}
											>
												提交
											</span>
											<span
												className="cancel"
												onClick={() => {
													this.textEmpty();
												}}
											>
												取消
											</span>
										</div>
									</div>
									<ul className="newsDetailCommentList">
										{newsDetailCommentL &&
											newsDetailCommentL.data &&
											newsDetailCommentL.data.length >
												0 &&
											newsDetailCommentL.data.map(
												(item, index) => {
													return (
														<li key={index}>
															<div className="newsDetailCommentListHead ui center">
																<div className="newsDetailHeadImg">
																	<img
																		src={
																			item.user &&
																			item
																				.user
																				.img
																		}
																		alt=""
																	/>
																</div>
																<div className="newsDetailHeadInfo">
																	<span className="newsDetailHeadName">
																		{item.user &&
																			item
																				.user
																				.name}
																	</span>
																	<span className="newsDetailHeadDate">
																		{
																			item.created_at
																		}
																	</span>
																</div>
															</div>
															<div className="newsDetailCommentListContent">
																<p>
																	{
																		item.content
																	}
																</p>
															</div>
														</li>
													);
												}
											)}
									</ul>
								</div>
							</div>

							<div
								id="newsDetailRight"
								className={
									newsDetail.article_next
										? "newsDetailRight show ui center m-hide"
										: "newsDetailRight ui center m-hide"
								}
							>
								{newsDetail.article_next && (
									<Link
										to={{
											pathname: "newsdetail",
											search:
												"?art_id=" +
												newsDetail.article_next.id
										}}
									>
										<span />
									</Link>
								)}
								{!newsDetail.article_next && <span />}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
