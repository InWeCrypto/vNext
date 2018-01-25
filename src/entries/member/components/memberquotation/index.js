import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class MemberQuotation extends PureComponent {
	constructor() {
		super();
		this.state = {
			per_page: 10
		};
	}
	componentDidMount() {
		setTimeout(() => {
			let boxH = document.querySelector("#quotationBox").offsetHeight;
			let pageH = document.querySelector("#PagationBox").offsetHeight;
			document.querySelector("#quotationList").style.height =
				boxH - pageH + "px";
			var per_pageH = parseInt((boxH - pageH - 50) / 77, 10);
			this.setState({
				per_page: per_pageH
			});
			this.getData(1);
		}, 0);
	}
	getData(page) {
		let query = "";
		query += `&per_page=${this.state.per_page}`;
		query += `&page=${page}`;
		this.props.getQuotationList(query);
	}
	changePagination(page) {
		this.getData(page);
	}
	render() {
		const { quotationList, lng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="quotationBox" className="quotation-box">
						<div id="quotationList" className="quotation-list">
							{quotationList &&
								quotationList.data &&
								quotationList.data.length > 0 &&
								quotationList.data.map((item, index) => {
									return (
										<div
											key={index}
											className="quotation-group ui center"
										>
											<i className="icon remind" />
											<div className="project-icon">
												<img src={item.img} />
											</div>
											<div>
												<div className="bigname">
													{item.name}
												</div>
												<div className="name">
													{item.long_name}
												</div>
											</div>
											<div className="f1 price-box">
												<div className="price-cont">
													<div className="t1">
														${item.ico.price_usd}
														<span
															className={(() => {
																return parseInt(
																	item.ico
																		.percent_change_24h,
																	10
																) -
																	0 >=
																	0
																	? "up"
																	: "down";
															})()}
														>
															({
																item.ico
																	.percent_change_24h
															})
														</span>
													</div>
													<div className="t2">
														≈${item.ico.price_btc}BTC
													</div>
												</div>
											</div>
											<div className="other">
												<div className="t1">Above</div>
												<div className="t2">
													${
														item.category_user
															.market_hige
													}
												</div>
											</div>
											<div className="other">
												<div className="t1">Below</div>
												<div className="t2">
													${
														item.category_user
															.market_lost
													}
												</div>
											</div>
										</div>
									);
								})}
							{(!quotationList ||
								!quotationList.data ||
								quotationList.data.length <= 0) && (
								<div>{t("nodata", lng)}</div>
							)}
						</div>

						<div id="PagationBox" className="pagination-box">
							{quotationList && (
								<Pagination
									defaultPageSize={this.state.per_page}
									defaultCurrent={quotationList.current_page}
									total={quotationList.total}
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
export default MemberQuotation;
