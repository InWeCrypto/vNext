import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getLocalTime, getMainMinHeight } from "../../../../utils/util";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailInfo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			curDynamic: 0,
			ulWidth: 0,
			isAjax: false,
			page: 1,
			total_page: 1,
			is_end: false
		};
	}
	componentWillMount() {}
	componentWillReceiveProps() {}
	componentDidMount() {
		this.initPage();
	}
	componentDidUpdate() {
		if (!IsTouchDevice) {
			let minH = getMainMinHeight();
			document.querySelector("#mainBox").style.height = minH + "px";
			document
				.getElementById("dynamicScroll")
				.addEventListener("scroll", this.dynamicScroll.bind(this));
		}
		let ulDomList = document.getElementById("projectDetailNavUl");
		if (!ulDomList) {
			this.setState({
				ulWidth: 600
			});
			return;
		}
		let liDomList = ulDomList.getElementsByTagName("li");
		let ulWidth = 0;
		for (let i = 0; i < liDomList.length; i++) {
			ulWidth = ulWidth + liDomList[i].clientWidth + 12;
		}
		this.setState({
			ulWidth
		});
	}
	initPage() {
		let id = this.props.projectDynamic.data[0].id;
		this.projectDynamicList("", 1);
		if (
			this.props.userInfo &&
			this.props.projectDetail.category_user &&
			this.props.projectDetail.category_user.is_favorite_dot
		) {
			this.cancelProjectDot();
		}
	}
	dynamicScroll() {
		let dynamic = document.getElementById("dynamicScroll");
		let cH = dynamic.clientHeight;
		let sH = dynamic.scrollHeight;
		let sT = dynamic.scrollTop;
		if (!this.state.is_end && cH > sH - sT - 50) {
			if (this.state.isAjax) {
				return;
			}
			if (this.state.page > this.state.total_page) return;
			this.setState({
				isAjax: true
			});
			this.props
				.getDynamicScrollList({
					cid: this.props.projectDetail.id,
					tag_id: this.state.curDynamic,
					type: "[2,3]",
					per_page: 10,
					page: this.state.page + 1
				})
				.then(res => {
					this.setState({
						curDynamic: this.state.curDynamic,
						page: this.state.page + 1,
						isAjax: false,
						total_page: res.data.last_page
					});
					if (this.state.page > this.state.total_page) {
						this.setState({
							is_end: true
						});
						Msg.prompt("没有更多了");
					}
				});
		}
	}
	cancelProjectDot() {
		// 取消项目红点
		this.props.unProjectDot({
			c_id: this.props.projectDetail.id
		});
	}
	projectDynamicList(id, page) {
		//获取项目动态
		let perpage = 10;
		if (IsTouchDevice) {
			perpage = 100;
		}
		this.props
			.getProjectDynamicList({
				cid: this.props.projectDetail.id,
				tag_id: id,
				type: "[2,3]",
				per_page: perpage,
				page: page || 1
			})
			.then(res => {
				this.setState({
					curDynamic: id,
					page: page,
					total_page: res.data.last_page
				});
				if (!IsTouchDevice) {
					if (this.state.page >= this.state.total_page) {
						this.setState({
							is_end: true
						});
						Msg.prompt("没有更多了");
					} else {
						this.setState({
							is_end: false
						});
					}
				}
			});
	}
	render() {
		const { curDynamic, ulWidth } = this.state;
		const {
			lng,
			changeLng,
			projectDetail,
			setProjectRemind,
			getProjectCollect,
			projectDynamic,
			projectDynamicList,
			unProjectDot
		} = this.props;

		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailInfo ui f1">
						<div className="projectDetailCon1 f1">
							<div className="projectDetailConTop ui">
								<div className="projectDetailConTopLeft">
									<div className="projectDetailCenter1">
										<div className="projectDetailImg">
											<img src={projectDetail.img} />
										</div>
										<span>{projectDetail.name}</span>
										<p>{projectDetail.industry}</p>
									</div>
								</div>
								<div className="projectDetailConTopRight">
									<GaiKuo
										changeLng={changeLng}
										lng={lng}
										projectDetail={projectDetail}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
									/>
								</div>
							</div>
							{IsTouchDevice && (
								<div className="projectDetailNav">
									{/* <div className="swiper-container projectDetailInfoNavSwiperContainer">
										<div class="swiper-wrapper">
											<div class="swiper-slide">
												slider1
											</div>
											<div class="swiper-slide">
												slider2
											</div>
											<div class="swiper-slide">
												slider3
											</div>
										</div>
									</div> */}
									<ul
										className="projectDetailNavUl"
										id="projectDetailNavUl"
										style={{ width: ulWidth }}
									>
										<li
											className={
												curDynamic == "" ? "cur" : ""
											}
											onClick={() => {
												this.projectDynamicList("", 1);
											}}
										>
											<span>
												{t("projectDetail.all", lng)}
											</span>
										</li>
										{projectDynamic &&
											projectDynamic.data &&
											projectDynamic.data.length > 0 &&
											projectDynamic.data.map(
												(item, index) => {
													return (
														<li
															key={index}
															className={
																curDynamic ==
																item.id
																	? "cur"
																	: ""
															}
															onClick={() => {
																this.projectDynamicList(
																	item.id,
																	1
																);
															}}
														>
															<span>
																{item.name}
															</span>
														</li>
													);
												}
											)}
									</ul>
								</div>
							)}
							<div className="projectDetailCon1Box">
								{projectDynamicList &&
									projectDynamicList.data &&
									projectDynamicList.data.length > 0 && (
										<div className="pdBoxList">
											<ul
												className="ui"
												id="dynamicScroll"
											>
												{projectDynamicList.data.map(
													(item, index) => {
														return (
															<li
																key={index}
																className={
																	item.type ==
																	3
																		? "infoVideo"
																		: ""
																}
															>
																<Link
																	to={{
																		pathname:
																			"/newsdetail",
																		search: `?art_id=${
																			item.id
																		}`
																	}}
																>
																	<div className="imgBox">
																		<img
																			src={
																				item.img
																			}
																			alt=""
																		/>
																	</div>
																	<div className="infoBot">
																		<p className="infoBotTitle ellitext">
																			{
																				item.title
																			}
																		</p>
																		<div className="infoBotDate">
																			<span
																			>
																				{getLocalTime(
																					item.created_at
																				)}
																			</span>
																			{item.is_sole && (
																				<i
																				>
																					{t(
																						"icon.original"
																					)}
																				</i>
																			)}
																		</div>
																	</div>
																</Link>
															</li>
														);
													}
												)}
											</ul>
											{false && (
												<div className="pageTurn m-hide">
													{projectDynamicList.prev_page_url && (
														<span
															className="pageTurmLf more"
															onClick={() => {
																this.projectDynamicList(
																	curDynamic,
																	projectDynamicList.current_page -
																		1
																);
															}}
														/>
													)}
													{!projectDynamicList.prev_page_url && (
														<span className="pageTurmLf" />
													)}
													{projectDynamicList.next_page_url && (
														<span
															className="pageTurmRt more"
															onClick={() => {
																this.projectDynamicList(
																	curDynamic,
																	projectDynamicList.current_page +
																		1
																);
															}}
														/>
													)}
													{!projectDynamicList.next_page_url && (
														<span className="pageTurmRt" />
													)}
												</div>
											)}
										</div>
									)}

								{(!projectDynamicList ||
									!projectDynamicList.data ||
									projectDynamicList.data.length <= 0) && (
									<div className="nodata-box">
										{t("nodata", lng)}
									</div>
								)}
							</div>
						</div>
						<div className="projectDetailCon2 m-hide">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									{t("projectDetail.project_dyna", lng)}
								</div>
								<ul className="projectDetailCon2Ul">
									<li
										className={
											curDynamic == "" ? "cur" : ""
										}
										onClick={() => {
											this.projectDynamicList("", 1);
										}}
									>
										<span>
											{t("projectDetail.all", lng)}
										</span>
									</li>
									{projectDynamic &&
										projectDynamic.data &&
										projectDynamic.data.length > 0 &&
										projectDynamic.data.map(
											(item, index) => {
												return (
													<li
														key={index}
														className={
															curDynamic ==
															item.id
																? "cur"
																: ""
														}
														onClick={() => {
															this.projectDynamicList(
																item.id,
																1
															);
														}}
													>
														<span>{item.name}</span>
													</li>
												);
											}
										)}
								</ul>
								{/* <div className="pageTurn">
									<span className="pageTurmLf" />
									<span className="pageTurmRt more" />
								</div> */}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailInfo;
