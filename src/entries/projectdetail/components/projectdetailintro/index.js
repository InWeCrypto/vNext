import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getLocalTime, getMainMinHeight } from "../../../../utils/util";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailIntro extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		if (!IsTouchDevice) {
			let minH = getMainMinHeight();
			document.querySelector("#mainBox").style.height = minH + "px";
		}
	}
	render() {
		const {
			lng,
			changeLng,
			projectDetail,
			setProjectRemind,
			getProjectCollect
		} = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="ProjectDetailIntro f1">
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
								{/* <div className="projectDetailCon1BoxTitle">
									{t("projectDetail.project_overview", lng)}
                                </div> */}
								<div style={{ height: ".2rem" }} />
								{projectDetail.category_presentation &&
									projectDetail.category_presentation.content
										.length > 0 && (
										<div
											className="introContent"
											dangerouslySetInnerHTML={{
												__html:
													projectDetail
														.category_presentation
														.content
											}}
										/>
									)}
								{(!projectDetail.category_presentation ||
									projectDetail.category_presentation.content
										.length <= 0) && (
									<div className="nodata-box">
										{t("nodata", lng)}
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIntro;
