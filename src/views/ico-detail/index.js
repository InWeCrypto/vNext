import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../actions/";
import echarts from "echarts";
import "./index.less";
class IcoDetail extends Component {
	async componentDidMount() {
		let q = util.getQuery(window.location.href);
		let data = await this.props.getIcoDetailAction({
			id: q.id
		});
		this.viewEcharts.call(this, data.ico_assess_structure);
	}
	viewEcharts(data) {
		let strcture = this.refs.strcture;
		let myChart = echarts.init(strcture);
		let strctureData = data;
		let value = [];
		let theColor = [];
		strctureData.map(item => {
			value.push({ value: item.percentage });
			theColor.push(item.color_value);
		});
		let option = {
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
							shadowColor: "rgba(0, 0, 0, 0.5)"
						}
					}
				}
			]
		};
		myChart.setOption(option);
	}
	render() {
		const { icoDetail } = this.props;
		return (
			<div className="icodetail-box">
				{icoDetail && (
					<div>
						<div className="icodetail-title">{icoDetail.title}</div>
						<div className="icodetail-time">
							{icoDetail.created_at}
						</div>
						{/* <div className="icodetail-medias">22</div> */}
						<div className="icodetail-intro">
							郑重说明：所有ICO都有归零的可能，所有信息仅供参考
						</div>
						<div className="icodetail-info">
							<div className="left">
								<div className="icodetail-scope">
									{icoDetail.ico_score}
								</div>
								<br />
								<div className="icodetail-scope-txt">
									{icoDetail.assess_status}
								</div>
							</div>
							<div className="middle">
								风险等级：<span
									className="color-rect"
									style={{
										background: icoDetail.risk_level_color
									}}
								/>
								{icoDetail.risk_level_name}
							</div>
							<div className="right">
								{icoDetail.tags &&
									icoDetail.tags.length > 0 &&
									icoDetail.tags.map((item, index) => {
										return (
											<div
												key={index}
												className="ico-tag-box"
											>
												<span className="ico-tag">
													{item.tag_info &&
														item.tag_info.name}
												</span>
											</div>
										);
									})}
							</div>
						</div>
						<div className="icodetail-detail">
							<div className="detail-title">
								<div className="detail-left">ICO详情</div>
								{icoDetail.website && (
									<a
										className="gowebsite"
										href={icoDetail.website}
										target="_blank"
									>
										官网
									</a>
								)}
							</div>

							{icoDetail.ico_assess_issue_info &&
								icoDetail.ico_assess_issue_info.length > 0 &&
								icoDetail.ico_assess_issue_info.map(
									(item, index) => {
										return (
											<div key={index}>
												<div className="icodetail-detail-item">
													<div className="name">
														ICO时间
													</div>
													<div className="value">
														{
															item.crowdfunding_start_at
														}-{
															item.crowdfunding_end_at
														}
													</div>
												</div>
												<div className="icodetail-detail-item">
													<div className="name">
														ICO规模
													</div>
													<div className="value">{`${item.ico_circulation /
														100000000}亿/${
														icoDetail.ico.unit
													}`}</div>
												</div>
												<div className="icodetail-detail-item">
													<div className="name">
														总量
													</div>
													<div className="value">{`${item.ico_amount /
														100000000}亿/${
														icoDetail.ico.unit
													}`}</div>
												</div>
												<div className="icodetail-detail-item">
													<div className="name">
														ICO价格
													</div>
													<div className="value">
														{/* 1{icoDetail.ico.unit}= */}
														{item.ico_price}
													</div>
												</div>
												<div className="icodetail-detail-item">
													<div className="name">
														接受币种
													</div>
													<div className="value">
														{item.ico_accept}
													</div>
												</div>
											</div>
										);
									}
								)}
						</div>
						{icoDetail.ico_assess_structure &&
							icoDetail.ico_assess_structure.length > 0 && (
								<div className="icodetail-framework">
									<div className="framework-title">
										项目结构
									</div>
									<div className="framework-cont">
										<div
											className="echarts"
											ref="strcture"
										/>
										<div className="framework-text">
											{icoDetail.ico_assess_structure.map(
												(item, index) => {
													return (
														<div
															key={index}
															className="framework-item"
														>
															{`${
																item.color_name
															},${item.desc}`}
														</div>
													);
												}
											)}
										</div>
									</div>
								</div>
							)}
						<div className="icodetail-desc">
							<div className="icodetail-desc-title">项目概述</div>
							<div className="icodetail-desc-cont">
								<div className="img-box">
									<img src={icoDetail.img} alt="" />
								</div>
								<div>{icoDetail.content}</div>
							</div>
						</div>
						{icoDetail.ico_assess_project_analyse &&
							icoDetail.ico_assess_project_analyse.length > 0 && (
								<div className="icodetail-analy">
									<div className="icodetail-analy-title">
										项目分数分析
									</div>
									<div className="icodetail-analy-cont">
										<div className="icodetail-analy-item">
											<div className="item">类型</div>
											<div className="item">评测观点</div>
											<div className="item">评分</div>
										</div>
										{icoDetail.ico_assess_project_analyse.map(
											(item, index) => {
												return (
													<div
														key={index}
														className="icodetail-analy-item"
													>
														<div className="item">
															{item.name}
														</div>
														<div className="item">
															{item.desc}
														</div>
														<div className="item">
															{item.score}
														</div>
													</div>
												);
											}
										)}
									</div>
								</div>
							)}
					</div>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		icoDetail: state.icoDetailData.icoDetail
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getIcoDetailAction: actions.getIcoDetailAction(dispatch)
	};
};
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(IcoDetail)
);
