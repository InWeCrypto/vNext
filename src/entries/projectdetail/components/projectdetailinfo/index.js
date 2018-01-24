import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailInfo extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			curDynamic: 0
		};
	}
	componentWillMount() {}
	componentWillReceiveProps() {}
	componentDidMount() {
		let id = this.props.projectDynamic.data[0].id;
		this.projectDynamicList(id, 1);
	}
	projectDynamicList(id, page) {
		//获取项目动态
		this.props
			.getProjectDynamicList({
				tag_id: id,
				type: "[2,3]",
				per_page: 4,
				page: page || 1
			})
			.then(res => {
				this.setState({
					curDynamic: id
				});
			});
	}
	render() {
		const { curDynamic } = this.state;
		const {
			lng,
			changeLng,
			projectDetail,
			setProjectRemind,
			getProjectCollect,
			projectDynamic,
			projectDynamicList
		} = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailInfo ui">
						<div className="projectDetailCon1">
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
							<div className="projectDetailCon1Box">
								<ul className="ui">
									{projectDynamicList &&
										projectDynamicList.data &&
										projectDynamicList.data.length > 0 &&
										projectDynamicList.data.map(
											(item, index) => {
												return (
													<li
														key={index}
														className={
															item.type == 3
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
																	{item.title}
																</p>
																<div className="infoBotDate">
																	<span>
																		{
																			item.created_at
																		}
																	</span>
																	{item.is_sole && (
																		<i>
																			原创
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
								<div className="pageTurn">
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
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									项目动态
								</div>
								<ul className="projectDetailCon2Ul">
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
