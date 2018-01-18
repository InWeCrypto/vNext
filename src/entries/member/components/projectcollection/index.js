import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class ProjectCollection extends PureComponent {
	constructor() {
		super();
		this.state = {
			per_page: 10,
			page: 0
		};
	}
	componentDidMount() {
		setTimeout(() => {
			let boxH = document.querySelector("#memberProject").offsetHeight;
			let pageH = document.querySelector("#memberPagationBox")
				.offsetHeight;
			document.querySelector("#memberListBox").style.height =
				boxH - pageH + "px";
			let memberNameH = document.querySelector("#memberNameBox")
				.offsetHeight;
			let pre_page = parseInt(
				(boxH - pageH - memberNameH - 30) / (memberNameH - 10),
				10
			);
			this.setState({
				per_page: pre_page
			});
			this.getData(pre_page);
		}, 0);
	}
	getData(pre_page) {
		let query = "";
		query += `per_page=${this.state.per_page}`;
		query += `&page=${pre_page}`;
		this.props.getCollectionList(query);
	}
	render() {
		const { userInfo, collectionList } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="memberProject" className="project-collect">
						<div id="memberListBox" className="member-list">
							<div className="member-name" id="memberNameBox">
								<span className="t1">Hello,</span>
								<span className="t2">
									{userInfo && userInfo.name}
								</span>
							</div>
							{collectionList &&
								collectionList.data &&
								collectionList.data.length > 0 &&
								collectionList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="project-group ui center"
										>
											<i className="icon-collect" />
											<div className="project-icon">
												<img src={item.img} />
											</div>
											<div className="project-name">
												{item.name}
											</div>
											<div className="project-market">
												<div className="price">
													<span className="t1">
														$232
													</span>
													<span className="t2 up">
														(+111.00%)
													</span>
													<i />
												</div>
												<div className="price-btc">
													≈0.1111BTC
												</div>
											</div>
											<div className="project-type">
												Trading
											</div>
											<div className="f1 project-news">
												最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin最近gengxin
											</div>
										</div>
									);
								})}
						</div>
						<div id="memberPagationBox" className="pagination-box">
							<Pagination efaultCurrent={5} total={500} />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectCollection;
