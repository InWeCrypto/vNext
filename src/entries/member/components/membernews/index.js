import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { getLocalTime } from "../../../../utils/util";
import { Pagination } from "antd";
import "./index.less";
class MemberNews extends PureComponent {
	constructor() {
		super();
		this.state = {
			per_page: 10,
			h: 10,
			w: 10,
			widthN: 4
		};
	}
	componentDidMount() {
		setTimeout(() => {
			let boxW = document.querySelector("#memberNewBox").offsetWidth;
			let boxH = document.querySelector("#memberNewBox").offsetHeight;
			let pageH = document.querySelector("#PagationBox").offsetHeight;
			document.querySelector("#memberNewsList").style.height =
				boxH - pageH + "px";
			var per_pageH = parseInt((boxH - pageH - 50) / 77, 10);
			let n = boxW > 700 ? 4 : 3;
			this.setState({
				per_page: this.state.widthN * 2,
				h: (boxH - pageH) / 2,
				widthN: n,
				w: boxW / n
			});

			this.getData(1);
		}, 0);
	}
	getData(page) {
		let query = "";
		query += `&per_page=${this.state.per_page}`;
		query += `&page=${page}`;
		this.props.getNewsList(query);
	}
	changePagination(page) {
		this.getData(page);
	}
	render() {
		const { lng, newsList } = this.props;
		console.log(newsList);
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="member-news" id="memberNewBox">
						<div
							className="membernews-list"
							id="memberNewsList"
							style={{
								width: this.state.w * this.state.widthN + "px"
							}}
						>
							{newsList &&
								newsList.data &&
								newsList.data.length > 0 &&
								newsList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="membernews-group"
											style={{
												height: this.state.h + "px",
												width: this.state.w + "px"
											}}
										>
											<Link
												to={{
													pathname: "/newsdetail",
													search: `?art_id=${item.id}`
												}}
												className="membernews-item"
											>
												<div className="img">
													<img src={item.img} />
												</div>
												<div className="text-box">
													<div className="title">
														{item.title}
													</div>
													<div className="info ui center">
														<div className="f1 time">
															{getLocalTime(
																item.created_at
															)}
														</div>
														{item.is_sole && (
															<div className="tag">
																{t(
																	"icon.original",
																	lng
																)}
															</div>
														)}
													</div>
												</div>
											</Link>
										</div>
									);
								})}

							{(!newsList ||
								!newsList.data ||
								newsList.data.length <= 0) && (
								<div
									style={{
										textAlign: "center",
										padding: "1rem 0"
									}}
								>
									{t("nodata", lng)}
								</div>
							)}
						</div>

						<div className="pagination-box" id="PagationBox">
							{newsList && (
								<Pagination
									defaultPageSize={this.state.per_page}
									defaultCurrent={newsList.current_page}
									total={newsList.total}
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
export default MemberNews;
