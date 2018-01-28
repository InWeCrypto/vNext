import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { StyleSheet, css } from "aphrodite";
import { spaceInDown } from "react-magic";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class MemberQuotation extends PureComponent {
	constructor() {
		super();
		this.state = {
			per_page: 10,
			aboveVal: 0,
			belowVal: 0,
			isShowMind: false,
			mindItem: null
		};
		this.styles = StyleSheet.create({
			magic: {
				animationName: spaceInDown,
				animationDuration: ".3s"
			}
		});
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
	changeVal(e, type) {
		this.setState({
			[type]: e.target.value
		});
	}
	changeFollow(item, e) {
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			isShowMind: true,
			mindItem: item,
			aboveVal: item.category_user
				? item.category_user.market_hige
					? item.category_user.market_hige
					: 0
				: 0,
			belowVal: item.category_user
				? item.category_user.market_lost
					? item.category_user.market_lost
					: 0
				: 0
		});
	}
	cannelRemind() {
		let item = this.state.mindItem;
		this.props
			.setProjectFollow(item.id, {
				is_market_follow: !item.category_user.is_market_follow
			})
			.then(res => {
				if (res.code === 4000) {
					this.closeRemind();
				}
			});
	}
	remindUpdate() {
		let item = this.state.mindItem;
		if (
			parseFloat(this.state.belowVal, 10) >=
			parseFloat(this.state.aboveVal, 10)
		) {
			Msg.prompt(i18n.t("error.followError", this.props.lng));
			return;
		}
		this.props
			.setProjectFollow(item.id, {
				is_market_follow: true,
				market_hige: this.state.aboveVal,
				market_lost: this.state.belowVal
			})
			.then(res => {
				if (res.code === 4000) {
					this.closeRemind();
				}
			});
	}
	openProject(item) {
		window.location.href = "/projectdetail?c_id=" + item.id;
	}
	closeRemind() {
		this.setState({
			isShowMind: false
		});
	}
	render() {
		const { quotationList, lng } = this.props;
		const { aboveVal, belowVal, isShowMind, mindItem } = this.state;
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
											onClick={this.openProject.bind(
												this,
												item
											)}
										>
											<div
												onClick={e => {
													this.changeFollow(item, e);
												}}
											>
												{item.category_user &&
													item.category_user
														.is_market_follow && (
														<i className="icon remind" />
													)}
												{(!item.category_user ||
													!item.category_user
														.is_market_follow) && (
													<i className="icon unremind" />
												)}
											</div>
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
														${item.ico &&
															item.ico.price_usd}
														<span
															className={(() => {
																return parseInt(
																	item.ico &&
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
															({item.ico &&
																item.ico
																	.percent_change_24h})
														</span>
													</div>
													<div className="t2">
														≈${item.ico &&
															item.ico
																.price_btc}BTC
													</div>
												</div>
											</div>
											<div className="other">
												<div className="t1">Above</div>
												<div className="t2">
													${item.category_user &&
														item.category_user
															.market_hige}
												</div>
											</div>
											<div className="other">
												<div className="t1">Below</div>
												<div className="t2">
													${item.category_user &&
														item.category_user
															.market_lost}
												</div>
											</div>
										</div>
									);
								})}
							{(!quotationList ||
								!quotationList.data ||
								quotationList.data.length <= 0) && (
								<div className="nodata-box">
									{t("nodata", lng)}
								</div>
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
						{isShowMind && (
							<div className="remindBox">
								<div className="remind-content">
									<div className="remind-bg" />
									<div className={css(this.styles.magic)}>
										<div className="remind-inbox">
											<div className="remind-in">
												<i
													className="icon-close"
													onClick={() => {
														this.closeRemind();
													}}
												/>
												<div className="remind-in-content">
													<div className="remind-in-title">
														行情提醒
													</div>
													<div className="remind-in-item">
														<div className="item-name">
															<img
																src={
																	mindItem.img
																}
															/>
															<span>
																{mindItem.name}
															</span>
														</div>
														<div className="item-input">
															<div className="remindAbove">
																<span>
																	Above
																</span>
																<div className="remindInput">
																	<b>$</b>
																	<input
																		type="text"
																		value={
																			aboveVal
																		}
																		onChange={e => {
																			this.changeVal(
																				e,
																				"aboveVal"
																			);
																		}}
																	/>
																</div>
															</div>
															<div className="remindBelow">
																<span>
																	Below
																</span>
																<div className="remindInput">
																	<b>$</b>
																	<input
																		type="text"
																		value={
																			belowVal
																		}
																		onChange={e => {
																			this.changeVal(
																				e,
																				"belowVal"
																			);
																		}}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className="remind-in-btn">
														<span
															className="remindCancel"
															onClick={() => {
																this.cannelRemind();
															}}
														>
															取消提醒
														</span>
														<span
															className="remindConfirm"
															onClick={() => {
																this.remindUpdate();
															}}
														>
															确定
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
export default MemberQuotation;
