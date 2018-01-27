import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailIntro extends PureComponent {
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
					<div className="ProjectDetailIntro ui f1">
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
							<div className="projectDetailCon1Box">
								<div className="projectDetailCon1BoxTitle">
									{t("projectDetail.project_overview", lng)}
								</div>
								<div className="introContent">
									{projectDetail.category_presentation &&
										projectDetail.category_presentation
											.content}
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIntro;
