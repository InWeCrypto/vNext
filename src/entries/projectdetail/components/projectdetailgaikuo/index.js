import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import echarts from "echarts";
import echartEmpty from "../../../../assets/images/echart_empty.png";
import "./index.less";
class ProjectDetailGaiKuo extends PureComponent {
	constructor() {
		super();
		this.state = {
			chartType: ["1m", "5m", "30m", "1h", "1w"],
			chartTypeIndex: 0
		};
	}
	componentDidMount() {
		const {
			lng,
			changeLng,
			projectDetail,
			coinTimePrice,
			setProjectRemind,
			getProjectCollect,
			projectKdata
		} = this.props;
		let query = `${projectDetail.unit}/usdt/${
			this.state.chartType[this.state.chartTypeIndex]
		}`;
		this.props.getKdata(query);
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
		if (!data || data.length <= 0 || data[0].length <= 0) {
			let img = document.createElement("img");
			img.src = echartEmpty;
			document.querySelector("#chartsBox").innerHTML = "";
			document.querySelector("#chartsBox").append(img);
			return;
		}
		let chart = document.querySelector("#chartsBox");
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
					left: "8%",
					right: "0",
					height: "75%",
					top: "2%"
				},
				{
					left: "8%",
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
	changeChartsType(idx) {
		this.setState({
			chartTypeIndex: idx
		});
		let query = `${this.props.projectDetail.unit}/usdt/${
			this.state.chartType[idx]
		}`;
		this.props.getKdata(query);
	}

	render() {
		const {
			lng,
			changeLng,
			projectDetail,
			coinTimePrice,
			setProjectRemind,
			getProjectCollect,
			projectKdata
		} = this.props;
		if (projectKdata && projectKdata.length > 0) {
			this.viewEcharts(projectKdata);
		}
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailGaiKuo ui">
						<div className="projectDetailCon1">
							<div className="projectDetailConTop ui">
								<div className="projectDetailConTopLeft">
									<div className="projectDetailCenter1">
										<div className="projectDetailImg">
											<img src={projectDetail.img} />
										</div>
										<span>{projectDetail.name}</span>
										<p>{projectDetail.industry}</p>
									</div>
								</div>
								<div className="projectDetailConTopRight">
									<GaiKuo
										changeLng={changeLng}
										lng={lng}
										projectDetail={projectDetail}
										setProjectRemind={setProjectRemind}
										getProjectCollect={getProjectCollect}
									/>
								</div>
							</div>
							<div className="projectDetailCon1Box">
								<div
									className={
										coinTimePrice &&
										coinTimePrice.percent_change_24h < 0
											? "gaiKuoMoney downs"
											: "gaiKuoMoney"
									}
								>
									<span>
										${" "}
										{coinTimePrice &&
											coinTimePrice.price_usd}
									</span>
									<i>
										({coinTimePrice &&
											coinTimePrice.percent_change_24h}%)
									</i>
									<b />
								</div>
								<p className="volume">
									Volume (24h)：${coinTimePrice &&
										coinTimePrice["24h_volume_usd"]}{" "}
									USD
								</p>

								<table>
									<thead>
										<tr>
											<th>市值排名</th>
											<th>市值</th>
											<th>流通量</th>
											<th>总量</th>
											<th>ICO Price</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												{coinTimePrice &&
													coinTimePrice.rank}
											</td>
											<td>
												${coinTimePrice &&
													coinTimePrice.market_cap_usd}
											</td>
											<td>
												{coinTimePrice &&
													coinTimePrice.available_supply}
											</td>
											<td>
												{coinTimePrice &&
													coinTimePrice.total_supply}
											</td>
											<td>
												${coinTimePrice &&
													coinTimePrice.price_usd}
											</td>
										</tr>
									</tbody>
								</table>
								<div className="gaiKuoChart" id="gaiKuoChart">
									<div className="charts-type ui start">
										<span>Zoom</span>
										{this.state.chartType &&
											this.state.chartType.map(
												(item, index) => {
													return (
														<span
															key={index}
															onClick={this.changeChartsType.bind(
																this,
																index
															)}
															className={(() => {
																return this
																	.state
																	.chartTypeIndex ==
																	index
																	? "charts-btn cur"
																	: "charts-btn";
															})()}
														>
															<span className="charts-text">
																{item}
															</span>
															<span className="line" />
														</span>
													);
												}
											)}
									</div>
									<div
										style={{ height: "3.3rem" }}
										className="charts-box"
										id="chartsBox"
									/>
								</div>
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Rank
								</div>
								<p className="hot">
									+关注热度：第{projectDetail.category_score &&
										projectDetail.category_score.sort}名
								</p>
								<p className="scord">
									+用户评分：{projectDetail.category_score &&
										projectDetail.category_score.value}
								</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Explore
								</div>
								{projectDetail &&
									projectDetail.category_explorer &&
									projectDetail.category_explorer.length >
										0 &&
									projectDetail.category_explorer.map(
										(item, index) => {
											return (
												<Link
													key={index}
													to={{
														pathname: item.url
													}}
												>
													<p>+{item.name}</p>
												</Link>
											);
										}
									)}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Wallet
								</div>
								{projectDetail &&
									projectDetail.category_wallet &&
									projectDetail.category_wallet.length > 0 &&
									projectDetail.category_wallet.map(
										(item, index) => {
											return (
												<Link
													key={index}
													to={{
														pathname: item.url
													}}
												>
													<p>+{item.name}</p>
												</Link>
											);
										}
									)}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Token Holders
								</div>
								<a
									href={projectDetail.token_holder}
									target="_blank"
								>
									<p className="viewMore">view more</p>
								</a>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Social
								</div>
								<ul className="shareList ui center">
									{projectDetail &&
										projectDetail.category_media &&
										projectDetail.category_media.length >
											0 &&
										projectDetail.category_media.map(
											(item, index) => {
												return (
													<li key={index}>
														<Link
															to={{
																pathname:
																	item.url
															}}
														>
															<img
																src={item.img}
																alt=""
															/>
														</Link>
													</li>
												);
											}
										)}
								</ul>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailGaiKuo;
