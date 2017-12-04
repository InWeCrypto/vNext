import React, { Component } from "react";
import "./index.less";
class Project extends Component {
	render() {
		let { projectList } = this.props;
		return (
			<div className="project">
				{projectList &&
					projectList.length > 0 &&
					projectList.map((item, index) => {
						return (
							<div className="project-item" key={index}>
								<div>
									<img src={item.img} />
								</div>
								<span>{item.name}</span>
							</div>
						);
					})}
			</div>
		);
	}
}
export default Project;
