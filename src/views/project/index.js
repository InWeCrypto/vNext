import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/";
import "./index.less";
import echarts from "echarts";
import { getFile } from "../../lib/js/app";
import { requestUrl } from "../../config/";
import RealTime from "./component/realtime/";
import Market from "./component/market/";
import Inews from "../components/inews/";
import $ from "jquery";
class Project extends Component {
	componentWillMount() {
		document.title = "项目详情";
		this.state = {
			kurl: null,
			marketIndex: 0
		};
	}
	componentWillUnmount() {
		this.props.resetProjectAction();
	}
	async componentDidMount() {
		let q = util.getQuery(window.location.href);
		let detail = await this.props.getProjectDetailAction({
			id: q.id
		});
		if (
			detail.project_time_prices &&
			detail.project_time_prices.length > 0
		) {
			detail.project_time_prices.map((item, index) => {
				this.props.getTimePriceAction({
					type: item.name,
					url: item.current_url
				});
				if (item.en_name == "BTC") {
					this.setState({
						kurl: item.k_line_data_url
					});
					this.getKdata(item.k_line_data_url, this.props.kType);
				}
			});
		}
		if (detail.project_markets && detail.project_markets.length > 0) {
			this.props.getMarketDataAction({
				url: detail.project_markets[0].url
			});
		}
		if (detail.id) {
			this.props.getImgTxtListAction({
				id: detail.id
			});
			this.props.getVideoListAction({
				id: detail.id
			});
			this.props.getProjectNewsListAction({
				id: detail.id
			});
		}
		if (detail.project_desc && detail.project_desc.length > 0) {
			detail.project_desc.map((item, index) => {
				this.insertHtml(index, `${requestUrl}/article/${item.id}`);
			});
		}
		if (detail.desc) {
			$(this.refs.twitterbox).html(detail.desc);
		}
	}
	async getKdata(url, type) {
		let data = await this.props.getKDataAction({
			url: url,
			type: this.getKtype(type)
		});
		this.viewEcharts(data);
	}
	getKtype(type) {
		let timeType = "";
		switch (type) {
			case 0:
				timeType = "1m";
				break;
			case 1:
				timeType = "5m";
				break;
			case 2:
				timeType = "15m";
				break;
			case 3:
				timeType = "30m";
				break;
			case 4:
				timeType = "1h";
				break;
			case 5:
				timeType = "2h";
				break;
			case 6:
				timeType = "4h";
				break;
			case 7:
				timeType = "6h";
				break;
			case 8:
				timeType = "1d";
				break;
			case 9:
				timeType = "1w";
				break;
		}
		return timeType;
	}
	setOptionData(data) {
		let res = [];

		data.map(item => {
			let r = [];
			r.push(this.setTimeString(item["time"]));
			r.push(item["opened_price"]);
			r.push(item["closed_price"]);
			r.push(item["min_price"]);
			r.push(item["max_price"]);
			r.push(item["volume"]);
			res.push(r);
		});

		return res;
	}
	setTimeString(time) {
		let t = new Date(time);
		let year = t.getFullYear();
		let month = t.getMonth() + 1;
		let day = t.getDate();
		let hours = t.getHours();
		let min = t.getMinutes();
		return `${year}/${month}/${day} ${hours}:${min}`;
	}
	viewEcharts(data) {
		if (!data) {
			return;
		}
		let chart = this.refs.chart;
		let myChart = echarts.init(chart);
		var upColor = "#FF7E00";
		var upBorderColor = "#FF7E00";
		var downColor = "#15A05D";
		var downBorderColor = "#15A05D";
		var data = this.setOptionData(data);
		data = splitData(data ? JSON.parse(JSON.stringify(data)) : []);
		function splitData(rawData) {
			var categoryData = [];
			var values = [];
			var volumes = [];
			for (var i = 0; i < rawData.length; i++) {
				categoryData.push(rawData[i].splice(0, 1)[0]);
				values.push(rawData[i]);
				volumes.push([
					i,
					rawData[i][4],
					rawData[i][0] > rawData[i][1] ? 1 : -1
				]);
			}

			return {
				categoryData: categoryData,
				values: values,
				volumes: volumes
			};
		}

		function calculateMA(dayCount, data) {
			var result = [];
			for (var i = 0, len = data.values.length; i < len; i++) {
				if (i < dayCount) {
					result.push("-");
					continue;
				}
				var sum = 0;
				for (var j = 0; j < dayCount; j++) {
					sum += data.values[i - j][1];
				}
				result.push(+(sum / dayCount).toFixed(3));
			}
			return result;
		}

		var option = {
			backgroundColor: "#fff",
			animation: true,
			// legend: {
			// 	bottom: 10,
			// 	left: "center",
			// 	data: ["Dow-Jones index"]
			// },
			barWidth: 4,
			tooltip: {
				trigger: "axis",
				axisPointer: {
					type: "cross"
				},
				backgroundColor: "rgba(245, 245, 245, 0.8)",
				borderWidth: 1,
				borderColor: "#ccc",
				padding: 10,
				textStyle: {
					color: "#000"
				},
				position: function(pos, params, el, elRect, size) {
					var obj = { top: 10 };
					obj[
						["left", "right"][+(pos[0] < size.viewSize[0] / 2)]
					] = 30;
					return obj;
				},
				extraCssText: "width: 170px"
			},
			axisPointer: {
				link: { xAxisIndex: "all" },
				label: {
					backgroundColor: "#777"
				}
			},
			toolbox: {
				show: false,
				feature: {
					dataZoom: {
						yAxisIndex: false
					},
					brush: {
						type: ["lineX", "clear"]
					}
				}
			},
			brush: {
				xAxisIndex: "all",
				brushLink: "all",
				outOfBrush: {
					colorAlpha: 0.1
				}
			},
			visualMap: {
				show: false,
				seriesIndex: 5,
				dimension: 2,
				pieces: [
					{
						value: 1,
						color: downColor
					},
					{
						value: -1,
						color: upColor
					}
				]
			},
			grid: [
				{
					left: "10%",
					right: "0",
					height: "75%",
					top: "2%"
				},
				{
					left: "10%",
					right: "0",
					top: "85%",
					height: "12%"
				}
			],
			xAxis: [
				{
					type: "category",
					data: data.categoryData,
					scale: true,
					boundaryGap: false,
					axisLine: { onZero: false },
					splitLine: { show: false },
					splitNumber: 20,
					min: "dataMin",
					max: "dataMax",
					axisPointer: {
						z: 100
					}
				},
				{
					type: "category",
					gridIndex: 1,
					data: data.categoryData,
					scale: true,
					boundaryGap: false,
					axisLine: { onZero: false },
					axisTick: { show: false },
					splitLine: { show: false },
					axisLabel: { show: false },
					splitNumber: 20,
					min: "dataMin",
					max: "dataMax",
					axisPointer: {
						label: {
							formatter: function(params) {
								var seriesValue = (params.seriesData[0] || {})
									.value;
								return (
									params.value +
									(seriesValue != null
										? "\n" +
											echarts.format.addCommas(
												seriesValue
											)
										: "")
								);
							}
						}
					}
				}
			],
			yAxis: [
				{
					scale: true,
					splitArea: {
						show: false
					}
				},
				{
					scale: true,
					gridIndex: 1,
					splitNumber: 2,
					axisLabel: { show: false },
					axisLine: { show: false },
					axisTick: { show: false },
					splitLine: { show: false }
				}
			],
			dataZoom: [
				{
					type: "inside",
					xAxisIndex: [0, 1],
					start: 80,
					end: 100
				},
				{
					show: false,
					xAxisIndex: [0, 1],
					type: "slider",
					top: "85%",
					start: 80,
					end: 100
				}
			],
			series: [
				{
					name: "Dow-Jones index",
					type: "candlestick",
					data: data.values,
					itemStyle: {
						normal: {
							color: upColor,
							color0: downColor,
							borderColor: null,
							borderColor0: null
						}
					},
					tooltip: {
						formatter: function(param) {
							param = param[0];
							return [
								"Date: " +
									param.name +
									'<hr size=1 style="margin: 3px 0">',
								"Open: " + param.data[0] + "<br/>",
								"Close: " + param.data[1] + "<br/>",
								"Lowest: " + param.data[2] + "<br/>",
								"Highest: " + param.data[3] + "<br/>"
							].join("");
						}
					}
				},
				{
					name: "MA5",
					type: "line",
					data: calculateMA(5, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA10",
					type: "line",
					data: calculateMA(10, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA20",
					type: "line",
					data: calculateMA(20, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "MA30",
					type: "line",
					data: calculateMA(30, data),
					smooth: true,
					lineStyle: {
						normal: { opacity: 0.5 }
					}
				},
				{
					name: "Volume",
					type: "bar",
					xAxisIndex: 1,
					yAxisIndex: 1,
					data: data.volumes
				}
			]
		};

		myChart.setOption(option);
	}
	setType(t) {
		if (!t || t <= 4) {
			reutrn;
		}
		switch (t) {
			case 5:
				return "上线中";
			case 6:
				return "待上线";
			case 7:
				return "众筹中";
			case 8:
				return "即将众筹";
		}
	}
	changeKtype(idx) {
		this.props.changeKTypeAction(idx);
		this.getKdata(this.state.kurl, idx);
	}
	setKclass(idx) {
		return idx === this.props.kType ? "k-navbtn cur" : "k-navbtn";
	}
	setMarketClass(idx) {
		return idx == this.state.marketIndex ? "nav-item cur" : "nav-item";
	}
	setKboxState() {
		return this.state.marketIndex == 0 ? "k-box show" : "k-box";
	}
	setMarkeyState() {
		return this.state.marketIndex == 1 ? "marketBox show" : "marketBox";
	}
	changeMarketIndex(idx) {
		this.setState({
			marketIndex: idx
		});
	}
	changeInewsType(idx) {
		this.props.changeInewsIndex(idx);
	}
	setIntroHeight(idx) {
		const iframebox = this.refs[`introIframe_${idx}`];
		if (!iframebox) {
			return;
		}
		iframebox.style.height = "auto";
		let h = iframebox.clientHeight;
		if (h > 200) {
			iframebox.style.height = "200px";
		} else {
			this.refs[`morebtn_${idx}`].style.display = "none";
		}
	}
	toggleIntro(idx, e) {
		const iframebox = this.refs[`introIframe_${idx}`];
		const t = this.refs[`introCont_${idx}`].style.display;
		if (t === "none") {
			e.target.className = "arrow show";
			this.refs[`introCont_${idx}`].style.display = "block";
		} else {
			e.target.className = "arrow";
			this.refs[`introCont_${idx}`].style.display = "none";
		}
	}
	insertHtml(idx, url) {
		const iframebox = this.refs[`introIframe_${idx}`];
		if (iframebox) {
			this.setState({
				firstLoad: false
			});
		} else {
			return;
		}
		getFile(url).then(res => {
			if (!/<!DOCTYPE[^>]+>/.test(res)) {
				iframebox.innerHTML = res;
			} else {
				let styleReg = new RegExp(/<style(([\s\S])*?)<\/style>/gi);
				let styleArr = res.match(styleReg);
				let bodyReg = new RegExp(/<body>[\S\s]*?<\/body>/);
				let bodyArr = bodyReg.exec(res);
				iframebox.innerHTML = `${styleArr.join("")}${bodyArr}`;
			}
		});
	}
	showIframeAll(idx, e) {
		const iframebox = this.refs[`introIframe_${idx}`];
		iframebox.style.height = "auto";
		e.target.style.display = "none";
	}
	setBox() {
		return this.props.kData || this.props.marketData ? "box2 show" : "box2";
	}
	render() {
		const {
			projectDetail,
			timePrice,
			marketData,
			imgTxtList,
			videoList,
			inewsIndex,
			newsFlash,
			kData
		} = this.props;
		return (
			<div className="project-detail">
				<div className="project-left">
					<div className="project-info">
						{projectDetail && (
							<div className="project-title-box">
								<h2 className="h2">{projectDetail.name}</h2>
								{/* <h3>22</h3> */}
								<div className="project-state">
									{this.setType(projectDetail.type)}
								</div>
							</div>
						)}
						{projectDetail &&
							timePrice && (
								<RealTime
									website={projectDetail.website}
									typeList={projectDetail.project_time_prices}
									timePrice={timePrice}
								/>
							)}
						{projectDetail &&
							projectDetail.ico_detail &&
							projectDetail.ico_detail.length > 0 && (
								<div className="ico-detail">
									<div className="ico-detail-title">
										<div className="ico-detail-titletxt">
											ICO详情
										</div>
										{projectDetail.website && (
											<a
												className="a"
												href={projectDetail.website}
											>
												官网
											</a>
										)}
									</div>
									{projectDetail.ico_detail.map(
										(item, index) => {
											return (
												<div
													key={index}
													className="ico-detail-item"
												>
													<span>{item.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
													<span>{item.desc}</span>
												</div>
											);
										}
									)}
								</div>
							)}
						<div className={this.setBox()}>
							<div className="box2-nav">
								{marketData &&
									kData && (
										<span
											onClick={this.changeMarketIndex.bind(
												this,
												0
											)}
											className={this.setMarketClass(0)}
										>
											K线
										</span>
									)}

								{marketData &&
									kData && (
										<span
											onClick={this.changeMarketIndex.bind(
												this,
												1
											)}
											className={this.setMarketClass(1)}
										>
											交易市场
										</span>
									)}
							</div>
							<div className={this.setKboxState()}>
								<div className="k-nav">
									<span
										onClick={this.changeKtype.bind(this, 0)}
										className={this.setKclass(0)}
									>
										1m
									</span>
									<span
										onClick={this.changeKtype.bind(this, 1)}
										className={this.setKclass(1)}
									>
										5m
									</span>
									<span
										onClick={this.changeKtype.bind(this, 2)}
										className={this.setKclass(2)}
									>
										15m
									</span>
									<span
										onClick={this.changeKtype.bind(this, 3)}
										className={this.setKclass(3)}
									>
										30m
									</span>
									<span
										onClick={this.changeKtype.bind(this, 4)}
										className={this.setKclass(4)}
									>
										1h
									</span>
									<span
										onClick={this.changeKtype.bind(this, 5)}
										className={this.setKclass(5)}
									>
										2h
									</span>
									<span
										onClick={this.changeKtype.bind(this, 6)}
										className={this.setKclass(6)}
									>
										4h
									</span>
									<span
										onClick={this.changeKtype.bind(this, 7)}
										className={this.setKclass(7)}
									>
										6h
									</span>
									<span
										onClick={this.changeKtype.bind(this, 8)}
										className={this.setKclass(8)}
									>
										1d
									</span>
									<span
										onClick={this.changeKtype.bind(this, 9)}
										className={this.setKclass(9)}
									>
										1w
									</span>
								</div>
								<div ref="chart" className="k-content" />
							</div>

							<div className={this.setMarkeyState()}>
								<Market marketData={marketData} />
							</div>
						</div>
					</div>
					{((videoList && videoList.length > 0) ||
						(imgTxtList && imgTxtList.length > 0)) && (
						<div className="box3">
							<Inews
								videoList={videoList}
								inewsIndex={inewsIndex}
								imgTxtList={imgTxtList}
								handClick={this.changeInewsType.bind(this)}
							/>
						</div>
					)}

					{projectDetail &&
						projectDetail.project_desc && (
							<div className="box3">
								<div className="intro-box">
									{projectDetail.project_desc.length > 0 &&
										projectDetail.project_desc.map(
											(item, index) => {
												return (
													<div
														key={index}
														className="intro-group"
													>
														{this.setIntroHeight(
															index
														)}
														<div className="intro-title">
															<div className="txt">
																{item.title}
															</div>
															<div
																className="arrow show"
																onClick={this.toggleIntro.bind(
																	this,
																	index
																)}
															/>
														</div>
														<div
															className="intro-cont"
															ref={`introCont_${index}`}
															style={{
																display: "block"
															}}
														>
															<div
																ref={`introIframe_${index}`}
																className="iframe"
															/>
															<div
																ref={`morebtn_${index}`}
																className="morebtn"
																onClick={this.showIframeAll.bind(
																	this,
																	index
																)}
															>
																read more>
															</div>
														</div>
													</div>
												);
											}
										)}
								</div>
							</div>
						)}
					{projectDetail &&
						projectDetail.project_medias &&
						projectDetail.project_medias.length > 0 && (
							<div className="contact-box">
								<div className="contact-title">社交</div>
								<div className="contact-cont">
									{projectDetail.project_medias.map(
										(item, index) => {
											return (
												<a
													key={index}
													target="_blank"
													href={item.url}
													className="contact-item"
												>
													<img
														className="img"
														src={item.img}
													/>
												</a>
											);
										}
									)}
								</div>
							</div>
						)}
				</div>
				<div className="project-right">
					{projectDetail && (
						<div className="project-evaluating box4">
							<div className="box-title">
								<span className="line" />
								<span className="box-title-txt">项目评测</span>
								<span className="line" />
							</div>
							<div className="project-evaluating-box">
								<div className="project-evaluating-item">
									<div className="project-evaluating-left">
										项目评分:
									</div>
									<div className="project-evaluating-right">
										{projectDetail.score}
									</div>
								</div>
							</div>
						</div>
					)}
					{newsFlash &&
						newsFlash.length > 0 && (
							<div className="project-newsflash box4">
								<div className="box-title">
									<span className="line" />
									<span className="box-title-txt">
										项目快讯
									</span>
									<span className="line" />
								</div>
								<div className="project-newsflash-box">
									{newsFlash.map((item, index) => {
										return (
											<Link
												key={index}
												to={{
													pathname: "/news-detail",
													search: "?id=" + item.id
												}}
												className="project-newsflash-item"
											>
												{item.title}
											</Link>
										);
									})}
								</div>
							</div>
						)}

					{projectDetail &&
						projectDetail.project_explorers &&
						projectDetail.project_explorers.length > 0 && (
							<div className="project-explore box4">
								<div className="box-title">
									<span className="line" />
									<span className="box-title-txt">
										Explore
									</span>
									<span className="line" />
								</div>
								<div className="project-explore-cont">
									{projectDetail.project_explorers.map(
										(item, index) => {
											return (
												<a
													href={item.url}
													key={index}
													target="_blank"
													className="project-explore-item"
												>
													{item.name}
												</a>
											);
										}
									)}
								</div>
							</div>
						)}
					{projectDetail &&
						projectDetail.project_wallets &&
						projectDetail.project_wallets.length > 0 && (
							<div className="project-wallet box4">
								<div className="box-title">
									<span className="line" />
									<span className="box-title-txt">
										Wallet
									</span>
									<span className="line" />
								</div>
								<div className="project-wallet-cont">
									{projectDetail.project_wallets.map(
										(item, index) => {
											<a
												href={item.url}
												target="_blank"
												className="project-wallet-item"
											>
												{item.name}
											</a>;
										}
									)}
								</div>
							</div>
						)}
					{projectDetail &&
						projectDetail.desc &&
						projectDetail.desc.length > 0 && (
							<div className="project-desc box4">
								<div className="box-title">
									<span className="line" />
									<span className="box-title-txt">
										Twitter Feed
									</span>
									<span className="line" />
								</div>
								<div
									className="project-desc-cont"
									ref="twitterbox"
								>
									11
								</div>
							</div>
						)}
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		projectDetail: state.projectData.projectDetail,
		timePrice: state.projectData.timePrice,
		kData: state.projectData.kData,
		kType: state.projectData.kType,
		marketData: state.projectData.marketData,
		videoList: state.projectData.videoList,
		imgTxtList: state.projectData.imgTxtList,
		inewsIndex: state.projectData.inewsIndex,
		newsFlash: state.projectData.newsFlash
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getProjectDetailAction: actions.getProjectDetailAction(dispatch),
		getTimePriceAction: actions.getTimePriceAction(dispatch),
		getKDataAction: actions.getKDataAction(dispatch),
		changeKTypeAction: actions.changeKTypeAction(dispatch),
		getMarketDataAction: actions.getMarketDataAction(dispatch),
		changeInewsIndex: actions.changeInewsIndex(dispatch),
		getVideoListAction: actions.getVideoListAction(dispatch),
		getImgTxtListAction: actions.getImgTxtListAction(dispatch),
		getProjectNewsListAction: actions.getProjectNewsListAction(dispatch),
		resetProjectAction: actions.resetProjectAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Project)
);
