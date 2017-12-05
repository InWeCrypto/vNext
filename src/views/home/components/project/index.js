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
							if (index >= 8) {
								return null;
							}
							return (
								<div className="project-item" key={index}>
									<div className="project-cont">
										<span>
											<img src={item.img} />
										</span>
										<br />
										<span>{item.name}</span>
									</div>
									{/* <div className="project-data">111</div> */}
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
export default Project;
