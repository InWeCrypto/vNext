import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import { Pagination } from "antd";
import AnnoBox from "../../../../components/annobox";
import {
	getMainMinHeight,
	getQuery,
	getLocalTime
} from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import LeftMenu from "../../../../components/leftmenu";
import "./index.less";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto",
			liH: "auto",
			lfMore: "leftArrow",
			rtMore: "rightArrow more",
			page: 1,
			nums: 8,
			mounted: false,
			showDetail: false,
			showItem: null,
			lang: '',
			listInfo: {},
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
		window.AnnouncmentAjaxDone = true;
		this.setState({lang: getQuery(location.search).lang||'zh'});
		setTimeout(() => {
			document.title =
				"InWe-" + i18n.t("navMenu.announcment", this.props.lng);
			let minH = getMainMinHeight();
			const { announcment={} } = this.props;
			let liH = minH / 2;
			this.setState({
				minH: minH,
				liH: liH,
				mounted: true
			});
			document.querySelector("#mainBox").style.minHeight = minH + "px";
			if(announcment.data && announcment.data.length) return;
			this.initPage(this.props.location.search);
		}, 0);
	}
	componentDidUpdate(){
		window.AnnouncmentAjaxDone = true;
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}
	handleScroll() {
		if (!IsTouchDevice) return;
		let footerDom = document.getElementById("footerBox");
		let winHei = document.documentElement.clientHeight;
		if (!footerDom) return;
		let footerToTopHei = footerDom.getBoundingClientRect().bottom - 10;
		let pathName = location.pathname;
		if (
			footerToTopHei <= winHei &&
			pathName == "/helpcenter" &&
			this.state.mounted
		) {
			var liDom = document.getElementsByClassName("annoucmentListLi");
			//手机默认请求20条
			if (liDom.length < 20) return;
			var pageIndex = parseInt(liDom.length / 20) + 1;

			if (window.AnnouncmentAjaxDone) {
				window.AnnouncmentAjaxDone = false;
				this.props.getAnnouncment({
					type: "[8,9,10,11]",
					lang: this.state.lang,
					per_page: 20,
					page: pageIndex
				});
			}
		}
	}
	initPage(location) {
		let p = getQuery(location);
		let annoBoxH =
			document.getElementById("annoCon").clientHeight -
			document.getElementById("pagationBox").clientHeight;
		let annoBoxLiH = 103;
		let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		if (p.page) {
			this.setState({
				page: p.page
			});
		}
		this.setState({
			nums: nums
		});
		if (IsTouchDevice) {
			nums = 20;
		}
		this.props.getAnnouncment({
			type: "[8,9,10,11]",
			lang: this.state.lang,
			page: p.page || 1,
			per_page: nums
		}).then(( { data } ) => {
			delete data.data;
			this.setState({listInfo: {...data}})
		});
	}
	changePagination(page) {
		this.props.getAnnouncment({
			type: "[8,9,10,11]",
			lang: this.state.lang,
			page: page,
			per_page: this.state.nums
		});
	}
	annoMove(val) {
		if (val == "left" && this.state.lfMore == "leftArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		} else if (val == "right" && this.state.rtMore == "rightArrow more") {
			let annoBoxH = document.getElementById("annoCon").clientHeight;
			let annoBoxLiH = 103;
			let nums = Math.floor(annoBoxH / annoBoxLiH) * 2;
		}
	}
	showDetailClick(item) {
        return;
		this.setState({
			showDetail: true,
			showItem: item
		});
	}
	closeDetailClick() {
		this.setState({
			showDetail: false,
			showItem: null
		});
	}
	render() {
		const { minH, liH, rtMore, lfMore, showDetail, showItem } = this.state;
		const {
			lng,
			changeLng,
			sendEmailCode,
			registerUser,
			loginIn,
			userInfo,
			setReduxUserInfo,
			forgetUser,
			announcment,
			commonMarket,
			getHeaderMarket
		} = this.props;
		const { listInfo } = this.state;
		
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<div id="mainBox" className="anno ui">
							{!IsTouchDevice && (
								<div className="left-menus ui center">
									<div className="left-menus-anno">
										<LeftMenu lng={lng} />
									</div>
								</div>
							)}
							<div id="helpcenter" className="annoBox ui f1">
								<div id="annoCon" className="annoCon ui f1">
									<div className="f1">
										<ul className="ui annoucmentListUl">
											{announcment &&
												announcment.data &&
												announcment.data.length > 0 &&
												announcment.data.map(
													(item, index) => {
														return (
															<li
																key={index}
																className="annoucmentListLi"
																onClick={this.showDetailClick.bind(
																	this,
																	item
																)}
															>
																<Link
																	to={{
																		pathname:
																			"newsdetail2",
																		search:
																			"?art_id=" +
																			item.id
																	}}
																>
																<div className="liBox">
																	<p className="annoBoxLiText ellitext">
																		{ item.title }
																	</p>
																</div>
																</Link>
															</li>
														);
													}
												)}
										</ul>
									</div>
								</div>

								<div
									className="pagation-box m-hide"
									id="pagationBox"
								>
									{listInfo && (
										<Pagination
											defaultPageSize={
												this.state.per_page
											}
											defaultCurrent={
												listInfo.current_page
											}
											total={listInfo.total}
											onChange={this.changePagination.bind(
												this
											)}
										/>
									)}
								</div>
							</div>
							{showDetail && (
								<AnnoBox
									close={this.closeDetailClick.bind(this)}
									item={showItem}
									lng={lng}
								/>
							)}
						</div>
						{IsTouchDevice ? (
							<div id="footerBox" />
						) : (
							<Footer changeLng={changeLng} lng={lng} />
						)}
					</div>
				)}
			</I18n>
		);
	}
}
