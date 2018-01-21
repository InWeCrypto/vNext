import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";

class ProjectCollection extends PureComponent {
	constructor() {
		super();
		this.state = {
			per_page: 10
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
			let per_page = parseInt(
				(boxH - pageH - memberNameH - 30) / (memberNameH - 10),
				10
			);
			this.setState({
				per_page: per_page
			});
			this.getData(1);
		}, 0);
	}
	getData(page) {
		let query = "";
		query += `&per_page=${this.state.per_page}`;
		query += `&page=${page}`;
		this.props.getCollectionList(query);
	}
	changePagination(page, size) {
		this.getData(page);
	}
	render() {
		const { userInfo, collectionList, lng } = this.props;
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
												{item.ico && (
													<div>
														<div className="price">
															<span className="t1">
																${item.ico &&
																	item.ico
																		.price_usd}
															</span>
															<span
																className={(() => {
																	if (
																		!item.ico
																	) {
																		return "t2";
																	}

																	return item.ico &&
																		item.ico
																			.percent_change_24h >
																			0
																		? "t2 up"
																		: "t2 down";
																})()}
															>
																({item.ico &&
																	item.ico
																		.percent_change_24h})%
															</span>
															<i />
														</div>
														<div className="price-btc">
															≈{item.ico &&
																item.ico
																	.price_btc}BTC
														</div>
													</div>
												)}
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
							{(!collectionList ||
								!collectionList.data ||
								collectionList.data.length <= 0) && (
								<div>{t("nodata", lng)}</div>
							)}
						</div>

						<div id="memberPagationBox" className="pagination-box">
							{collectionList && (
								<Pagination
									defaultPageSize={this.state.per_page}
									defaultCurrent={collectionList.current_page}
									total={collectionList.total}
									onChange={this.changePagination.bind(this)}
								/>
							)}
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectCollection;
