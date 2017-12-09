import React, { Component } from "react";
import { Link } from "react-router-dom";
import searchbtn from "../../../../lib/images/search_focus.png";
import close from "../../../../lib/images/project_up.png";
import "./index.less";
class ProjectAll extends Component {
	constructor(props) {
		super(props);

		this.state = {
			projectList: props.projectList ? props.projectList : null,
			keyWord: ""
		};
		this.onClickChange = this.onClickChange.bind(this);
		this.searchInputChange = this.searchInputChange.bind(this);
		this.searchBtnClick = this.searchBtnClick.bind(this);
	}
	onClickChange() {
		this.props.changeState(false);
	}
	searchInputChange(e) {
		this.setState({
			keyWord: e.target.value
		});
	}
	searchBtnClick() {
		let arr;
		let word = this.state.keyWord.toLocaleLowerCase();
		if (word == "") {
			this.setState({
				projectList: this.props.projectList
			});
			return;
		}
		arr = this.props.projectList.filter((item, index) => {
			if (item.name.toLocaleLowerCase().indexOf(word) != -1) {
				return item;
			}
		});
		this.setState({
			projectList: arr
		});
	}
	render() {
		let { projectList } = this.state;
		return (
			<div className="projectall">
				<div onClick={this.onClickChange} className="projectall-bg" />
				<div className="container-main projectadd-box">
					<div className="projectall-search">
						<div className="projectall-searchbox">
							<input
								className="projectall-searchtxt"
								type="search"
								onChange={this.searchInputChange}
							/>
							<span
								className="projectall-searchbtn"
								onClick={this.searchBtnClick}
							>
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
										<Link
											to={{
												pathname: "/project",
												search: "?id=" + item.id
											}}
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
										</Link>
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
