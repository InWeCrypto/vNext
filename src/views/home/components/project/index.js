import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import projectMore from "../../../../lib/images/project_down.png";
class Project extends Component {
	constructor() {
		super();
		this.onClickMore = this.onClickMore.bind(this);
	}
	onClickMore() {
		this.props.changeState(true);
	}
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
								<Link
									to={{
										pathname: "/project",
										search: "?id=" + item.id
									}}
									className="project-item"
									key={index}
								>
									<div className="project-cont">
										<span>
											<img src={item.img} />
										</span>
										<br />
										<span>{item.name}</span>
									</div>
								</Link>
							);
						})}
				</div>
				<div className="project-more" onClick={this.onClickMore}>
					<img src={projectMore} />
				</div>
			</div>
		);
	}
}
export default Project;
