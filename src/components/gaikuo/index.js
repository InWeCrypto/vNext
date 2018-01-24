import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { StyleSheet, css } from "aphrodite";
import { puffIn } from "react-magic";

import "./index.less";

class GaiKuo extends PureComponent {
	constructor() {
		super();
		this.state = {
			showShareList: false,
			remind: false,
			remindBox: false,
			collect: false,
			home: false,
			share: false,
			aboveVal: "",
			belowVal: "",
			is_favorite: ""
		};
		this.styles = StyleSheet.create({
			magic: {
				animationName: puffIn,
				animationDuration: ".3s"
			}
		});
	}
	componentDidMount() {
		this.initPage();
	}
	initPage() {
		if (
			this.props.projectDetail.category_user &&
			this.props.projectDetail.category_user.is_market_follow
		) {
			this.setState({
				aboveVal:
					this.props.projectDetail.category_user &&
					this.props.projectDetail.category_user.market_hige,
				belowVal:
					this.props.projectDetail.category_user &&
					this.props.projectDetail.category_user.market_lost
			});
		}
		this.setState({
			is_favorite:
				this.props.projectDetail.category_user &&
				this.props.projectDetail.category_user.is_favorite
		});
	}
	toggleShareList(e) {
		e.stopPropagation();
		this.setState({
			showShareList: !this.state.showShareList
		});
	}
	toggleList(val, e) {
		// let set = {};
		// set[val] = !this.state[val];
		// this.setState(set);
		if (val == "remind") {
			this.setState({
				remindBox: !this.state.remindBox
			});
		}
		if (val == "collect") {
			this.props
				.getProjectCollect({
					c_id: this.props.projectDetail.id,
					enable: !this.state.is_favorite
				})
				.then(res => {
					this.setState({
						is_favorite: res.data.is_favorite
					});
				});
		}
		if (val == "share") {
			this.toggleShareList(e);
		}
	}
	closeRemind() {
		this.setState({
			remindBox: false
		});
	}
	changeVal(e, type) {
		let val = e.target.value;
		if (!isNaN(val)) {
			let obj = {};
			obj[type] = val;
			this.setState(obj);
		}
	}
	remindUpdate(type, c_id, is_market_follow) {
		this.props
			.setProjectRemind({
				c_id: c_id,
				is_market_follow: is_market_follow,
				market_hige: this.state.aboveVal,
				market_lost: this.state.belowVal
			})
			.then(res => {
				if (res.code == 4000) {
					this.closeRemind();
				}
			});
	}
	render() {
		const { lng, projectDetail } = this.props;
		const {
			showShareList,
			remind,
			home,
			collect,
			share,
			remindBox,
			aboveVal,
			belowVal
		} = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="gaikuo">
						<div className="gaikuoBox">
							<ul className="gaikuoUl ui">
								<li
									className={
										projectDetail.category_user &&
										projectDetail.category_user
											.is_market_follow
											? "gaikuoRemind cur"
											: "gaikuoRemind"
									}
									onClick={e => {
										this.toggleList("remind", e);
									}}
								>
									{/* 收藏 官网 分享 */}
									<b className="" />
									<span>提醒</span>
								</li>
								<li
									className={
										projectDetail.category_user &&
										projectDetail.category_user.is_favorite
											? "gaikuoCollect cur"
											: "gaikuoCollect"
									}
									onClick={e => {
										this.toggleList("collect", e);
									}}
								>
									<b className="" />
									<span>收藏</span>
								</li>
								<li
									className={
										home ? "gaikuoHome cur" : "gaikuoHome"
									}
									onClick={e => {
										this.toggleList("home", e);
									}}
								>
									<a href={projectDetail.website}>
										<b className="" />
										<span>官网</span>
									</a>
								</li>
								<li
									className={
										share
											? "gaikuoShare cur"
											: "gaikuoShare"
									}
									onClick={e => {
										this.toggleList("share", e);
									}}
								>
									<b className="" />
									<span>分享</span>
								</li>
							</ul>
							{showShareList && (
								<ul className="shareList ui center">
									<li className="wx" />
									<li className="pyq" />
									<li className="tele" />
									<li className="qq" />
								</ul>
							)}
						</div>
						{remindBox && (
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
																	projectDetail.img
																}
																alt=""
															/>
															<span>
																{
																	projectDetail.name
																}
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
																this.remindUpdate(
																	"cancel",
																	projectDetail.id,
																	false
																);
															}}
														>
															取消提醒
														</span>
														<span
															className="remindConfirm"
															onClick={() => {
																this.remindUpdate(
																	"confirm",
																	projectDetail.id,
																	true
																);
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
export default GaiKuo;