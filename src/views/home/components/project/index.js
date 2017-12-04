import React, { Component } from "react";
import "./index.less";
class Project extends Component {
	render() {
		let { projectList } = this.props;
		return (
			<div className="project">
				<div className="project-box">
					{projectList &&
						projectList.length > 0 &&
						projectList.map((item, index) => {
							return (
								<div className="project-item" key={index}>
									<div>
										<span>
											<img src={item.img} />
										</span>
										<br />
										<span>{item.name}</span>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
export default Project;
