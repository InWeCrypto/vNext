import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";

import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import FixedMenu from "../../../../components/fixedmenu";
import "./index.less";

export default class Root extends PureComponent {
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		document.title = "InWe-News";
		this.props.getNewsDetail();
		let minH = getMainMinHeight();
		let leftArrow = document.getElementById("newsDetailLeft").offsetLeft;
		document.getElementById("newsDetailRight").style.right =
			leftArrow + "px";
		this.setState({
			minH: minH
		});
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	componentDidUpdate() {}
	constructor(props) {
		super(props);
		this.state = {
			minH: "auto"
		};
	}
	render() {
		const { minH } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container">
						<FixedMenu changeLng={changeLng} lng={lng} />
						<Header />
						<div id="mainBox" className="newsDetail ui">
							<div
								id="newsDetailLeft"
								className="newsDetailLeft ui center"
							>
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
							<div className="newsDetailCon">
								<div className="newsDetailConTitle">
									<span>
										纽约州议员提出四项区块链技术相关法案
									</span>
								</div>
								<div className="newsMeta">
									<div className="newsDetailConMeta">
										<span className="metaDate">
											2017-11-16 11:35:33
										</span>
										<span className="metaCategory">
											原创
										</span>
										<img
											src="http://down1.sucaitianxia.com/psd02/psd169/psds32262.jpg"
											alt=""
										/>
										<img
											src="http://down1.sucaitianxia.com/psd02/psd169/psds32262.jpg"
											alt=""
										/>
										<img
											src="http://down1.sucaitianxia.com/psd02/psd169/psds32262.jpg"
											alt=""
										/>
									</div>
									<div className="newDetailConShare">
										<span>
											<b className="wxShare" />
										</span>
										<span>
											<b className="collect active" />
										</span>
									</div>
								</div>
								<div className="newsDetailBox">
									{/* 视频 */}
									<div className="newsDetailContent">
										<p>
											NEO是一个非盈利的社区化的区块链项目，是利用区块链技术和数字身份进行资
											产数字化，利用智能合约对数字资产进行自动化管理，实现“智能经济”的一种分
											布式网络。NEO于2014年正式立项，2015年6月在Github上实时开源，自成立以
											来，NEO团队亲历了区块链行业的高潮与低谷，数字货币市场的狂热与冷却。我
											们相信，科技是这个时代变迁的原动力，在这股动力的推动下，我们将迈入新
											的“智能经济”时代。
										</p>
										<img
											src="http://img4.imgtn.bdimg.com/it/u=4004954884,1272926999&fm=214&gp=0.jpg"
											alt=""
										/>
										<p>
											NEO是一个非盈利的社区化的区块链项目，是利用区块链技术和数字身份进行资
											产数字化，利用智能合约对数字资产进行自动化管理，实现“智能经济”的一种分
											布式网络。NEO于2014年正式立项，2015年6月在Github上实时开源，自成立以
											来，NEO团队亲历了区块链行业的高潮与低谷，数字货币市场的狂热与冷却。我
											们相信，科技是这个时代变迁的原动力，在这股动力的推动下，我们将迈入新
											的“智能经济”时代。
										</p>
									</div>
									<p className="newsReadNums">13人已读</p>
								</div>
								<div className="newsDetailComment">
									<div className="newsDetailCommentNums">
										<b>1</b>条评论
									</div>
									<div className="newsDetailCommmentBox">
										<div className="newsDetailCommentBoxCenter ui center">
											<div className="newsDetailHeadImg">
												<img
													src="http://a.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=bbba1da0d60735fa91a546bdab612385/9825bc315c6034a84e7d073ac9134954082376e9.jpg"
													alt=""
												/>
											</div>
											<textarea
												name=""
												id=""
												placeholder="说点什么..."
											/>
										</div>
										<div className="newsDetailCommentBoxBtn clearfix">
											<span className="submit">提交</span>
											<span className="cancel">取消</span>
										</div>
									</div>
									<ul className="newsDetailCommentList">
										<li>
											<div className="newsDetailCommentListHead ui center">
												<div className="newsDetailHeadImg">
													<img
														src="http://a.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=bbba1da0d60735fa91a546bdab612385/9825bc315c6034a84e7d073ac9134954082376e9.jpg"
														alt=""
													/>
												</div>
												<div className="newsDetailHeadInfo">
													<span className="newsDetailHeadName">
														想要一只猫
													</span>
													<span className="newsDetailHeadDate">
														2017.11.11 12:30:11
													</span>
												</div>
											</div>
											<div className="newsDetailCommentListContent">
												<p>很有作用</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div
								id="newsDetailRight"
								className="newsDetailRight show ui center"
							>
								<Link
									to={{
										pathname: "/project",
										search: ""
									}}
								>
									<span />
								</Link>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
