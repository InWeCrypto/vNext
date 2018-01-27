import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import echarts from "echarts";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailIco extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			monthArr: [
				"january",
				"february",
				"march",
				"april",
				"may",
				"june",
				"july",
				"august",
				"september",
				"october",
				"november",
				"december"
			]
		};
	}
	componentDidMount() {
		if (
			this.props.projectDetail &&
			this.props.projectDetail.category_structure
		) {
			const chartBox = document.querySelector("#icoCharts");
			const w = chartBox.offsetWidth;
			chartBox.style.height = w + "px";
			this.viewEcharts(this.props.projectDetail.category_structure);
		}
	}
	viewEcharts(data) {
		let strcture = document.querySelector("#icoCharts");
		let myChart = echarts.init(strcture);
		let strctureData = data;
		let value = [];
		let theColor = [];
		strctureData.map(item => {
			value.push({
				value: item.percentage,
				color_name: item.color_name,
				desc: item.desc
			});
			theColor.push(item.color_value);
		});
		let option = {
			tooltip: {
				trigger: "item",
				formatter: (value, a) => {
					return (
						value.data.color_name +
						"<br />占比：" +
						value.data.value +
						"%<br/>描述：" +
						value.data.desc
					);
				}
			},
			series: [
				{
					type: "pie",
					radius: "85%",
					center: ["50%", "50%"],
					data: value,
					color: theColor,
					labelLine: {
						normal: {
							show: false
						}
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: "#fff"
						}
					}
				}
			]
		};
		myChart.setOption(option);
	}
	getEndDay(start, end) {
		let now = new Date();
		let end_at = new Date(end);
		let start_at = new Date(start);
		if (now.getTime() < start_at.getTime()) {
			return `starts ${
				start_at.getDate() < 10
					? "0" + start_at.getDate()
					: start_at.getDate()
			} ${this.state.monthArr[start_at.getMonth()].slice(0, 3)}`;
		} else if (now.getTime() > end_at.getTime()) {
			return `ended ${
				end_at.getDate() < 10
					? "0" + end_at.getDate()
					: end_at.getDate()
			} ${this.state.monthArr[end_at.getMonth()].slice(0, 3)}`;
		} else {
			let str = "ends in 2 days";
			let day = Math.ceil(
				(end_at.getTime() - now.getTime()) / 3600 / 1000 / 24
			);
			return `ends in ${day} days`;
		}
	}
	render() {
		const {
			lng,
			changeLng,
			projectDetail,
			setProjectRemind,
			getProjectCollect
		} = this.props;

		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailIco ui f1">
						<div className="projectDetailCon1 f1">
							<div className="projectDetailConTop ui">
								<div className="projectDetailConTopLeft">
									<div className="projectDetailCenter1">
										<div className="projectDetailImg">
											<img src={projectDetail.img} />
										</div>
										<span>{projectDetail.name}</span>
										<p>{projectDetail.intrusion}</p>
									</div>

									<div className="projectDetailCenter2">
										<span>{projectDetail.type_name}</span>
										<p>
											Token Sale{" "}
											<i>
												{(() => {
													return this.getEndDay(
														projectDetail.category_desc &&
															projectDetail
																.category_desc
																.start_at,
														projectDetail.category_desc &&
															projectDetail
																.category_desc
																.end_at
													);
												})()}
											</i>
										</p>
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
							<div className="projectDetailCon1Box ui">
								<div className="projectDetailCon1BoxLeft">
									<div className="projectDetailCon1BoxLeftDate">
										<b />
										<p>
											{projectDetail.category_desc &&
												projectDetail.category_desc.start_at
													.slice(5, 10)
													.replace(/-/, ".")}{" "}
											-
											{projectDetail.category_desc &&
												projectDetail.category_desc.end_at
													.slice(5, 10)
													.replace(/-/, ".")}
										</p>
									</div>
									<div className="ul ">
										<p
											dangerouslySetInnerHTML={{
												__html:
													projectDetail.category_desc &&
													projectDetail.category_desc
														.content
											}}
										/>
									</div>
								</div>
								<div className="projectDetailCon1BoxRight">
									<div className="projectDetailCon1BoxRightTit">
										{t("projectDetail.ico_structure", lng)}
									</div>
									<ul>
										{projectDetail &&
											projectDetail.category_structure &&
											projectDetail.category_structure
												.length > 0 &&
											projectDetail.category_structure.map(
												(item, index) => {
													return (
														<li
															key={index}
															className="ui center"
														>
															<b
																style={{
																	backgroundColor:
																		item.color_value
																}}
															/>
															<span>
																{
																	item.percentage
																}%{item.desc}
															</span>
														</li>
													);
												}
											)}
									</ul>
									<div
										className="icon-charts"
										id="icoCharts"
									/>
								</div>
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									{t("projectDetail.rank_title", lng)}
								</div>
								<p>
									+{t("projectDetail.sort", lng)}
									{projectDetail.category_score &&
										projectDetail.category_score.sort}
									{t("projectDetail.sort_s", lng)}
								</p>
								<p>
									+{t("projectDetail.user_score", lng)}：{projectDetail.category_score &&
										projectDetail.category_score.value}
								</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									{t("projectDetail.explore_title", lng)}
								</div>
								{projectDetail &&
									projectDetail.category_explorer &&
									projectDetail.category_explorer.length >
										0 &&
									projectDetail.category_explorer.map(
										(item, index) => {
											return (
												<Link
													to={{
														pathname: item.url
													}}
													key={index}
												>
													<p>+{item.name}</p>
												</Link>
											);
										}
									)}
								{/* <p>+qtumexplorer.io</p> */}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									{t("projectDetail.wallet_title", lng)}
								</div>
								{projectDetail &&
									projectDetail.category_wallet &&
									projectDetail.category_wallet.length > 0 &&
									projectDetail.category_wallet.map(
										(item, index) => {
											return (
												<Link
													to={{
														pathname: item.url
													}}
													key={index}
												>
													<p>+{item.name}</p>
												</Link>
											);
										}
									)}
								{/* <p>+Im token</p> */}
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									{t("projectDetail.social_title", lng)}
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
															/>
														</Link>
													</li>
												);
											}
										)}
								</ul>

								{/* <p>+Im token</p> */}
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIco;
