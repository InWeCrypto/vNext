import React, { Component } from "react";
import searchbtn from "../../../../lib/images/search_focus.png";
import close from "../../../../lib/images/project_up.png";
import "./index.less";
class ProjectAll extends Component {
	constructor() {
		super();
		this.onClickChange = this.onClickChange.bind(this);
	}
	onClickChange() {
		this.props.changeState(false);
	}
	render() {
		let { projectList } = this.props;
		return (
			<div className="projectall">
				<div onClick={this.onClickChange} className="projectall-bg" />
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
										<div
											key={index}
											className="projectall-item"
										>
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
					</div>
				</div>
			</div>
		);
	}
}
export default ProjectAll;
