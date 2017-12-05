import React, { Component } from "react";
import searchbtn from "../../../../lib/images/search_focus.png";
import close from "../../../../lib/images/project_up.png";
import "./index.less";
class ProjectAll extends Component {
	render() {
		let { projectList } = this.props;
		return (
			<div className="projectall">
				<div className="container projectadd-box">
					<div className="projectall-search">
						<div className="projectall-searchbox">
							<input
								className="projectall-searchtxt"
								type="search"
							/>
							<span className="projectall-searchbtn">
								<img src={searchbtn} />
							</span>
						</div>
					</div>
					<div className="projectall-cont">
						<div className="projectall-list">
							{projectList &&
								projectList.length > 0 &&
								projectList.map((item, index) => {
									return (
										<div className="projectall-item">
											<div className="projectall-itembox">
												<img
													className="projectall-img"
													src={item.img}
												/>
												<div className="projectall-name">
													{item.name}
												</div>
											</div>
										</div>
									);
								})}
						</div>
						<div className="projectall-ctrl">
							<img src={close} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default ProjectAll;
