import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { NavLink, Link } from "react-router-dom";
import QcodeBox from "../../../../components/qcode";
import { getRouteQuery } from "../../../../utils/util.js";

import title from "../../../../assets/images/inwetitle1.png";
import title1 from "../../../../assets/images/inwe01.png";
import title2 from "../../../../assets/images/inwe02.png";
import round from "../../../../assets/images/app_round.png";
import dots from "../../../../assets/images/dotdots.png";
import codea from "../../../../assets/images/app_code.png";
import gift from "../../../../assets/images/liwu_ico.png";
import close from "../../../../assets/images/close_icoapp.png";
import "./index.less";
import { platform } from "os";
import { Modal } from "antd";

export default class Root extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			subcode: ""
		};
	}
	componentWillReceiveProps(nextProps) {}
	componentDidMount() {
		let query = getRouteQuery(this);
		let code = query.code;
		let token = decodeURI(query.token);
		if (code) {
			this.setState({
				code
			});
		}
		if (token) {
			this.setState({
				token
			});
			window.isShareapp = true;
			window.shareToken = token;
		}
	}
	textChange(e) {
		let val = e.target.value;
		this.setState({
			subcode: val
		});
	}
	textSubmit() {
		let code = this.state.subcode;
		this.props.postOwnCode(code).then(res => {
			if (res.code == 4000) {
				//alert("提交成功");
				Modal.success({
					title: "提示",
					content: "提交成功"
				});
			}
		});
	}
	render() {
		const { code } = this.state;
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { i18n }) => (
					<div className="container share2app">
						{/* <div className="closeBox">
							<img src={close} alt="" className="img" />
						</div> */}
						<div className="holdtitle">
							<img className="img" src={title} alt="" />
						</div>
						<div className="textq1">
							亲爱的InWeCrypto社区支持者们,
							<br />
							<br />
							非常感谢你们对InWeCrypto的关注与支持。在你们的支持下，我们将推出新一代安全可靠的移动端钱包--InWe钱包，钱包同时支持BTC，ETH，ERC20，还支持NEO的全局资产如NEO，GAS以及NEP5代币（即所有基于NEO主链开发的资产都能得到支持，类似ETH的ERC20）。为感谢广大用户的支持，我们将进行新一轮的回馈活动。
							<br />
							<br />
							近期，NEO理事会将在NEO社区开启本体（ONT）的空投，根据每个neo地址的neo数量，以每个neo获得0.2个ONT来进行空投。针对此次活动，我们将为InWeCrypto的app端InWe钱包用户（IOS和Android）提供以下福利：
						</div>
						<div className="title1">
							<img src={title1} alt="" className="img" />
						</div>
						<div className="messBox1">
							<div className="mess1Img">
								<img src={round} alt="" className="img" />
							</div>
							<div className="mess1">
								<div className="topBox">
									<div className="imgBox">
										<img
											src={codea}
											alt=""
											className="img"
										/>
									</div>

									<div className="mess1-title">
										<a href="http://inwecrypto.com/intruduce">
											{code}
										</a>
									</div>
									<div className="mess1-title2">
										我的专属邀请码
									</div>
								</div>
								<div className="middleBox">
									<img src={dots} alt="" className="img" />
								</div>
								<div className="bottomBox">
									<div className="mess1-rule-title">
										奖励规则：
									</div>
									<div className="rulemess">
										a.
										用户注册下载app端InWe钱包（IOS和Android）并持有neo资产，不仅可以获得NEO理事会的空投，也可获得我们的空投，即在InWe钱包里持有每100个NEO还可额外获得6个ONT的奖励（其中50%可自由交易，另50%自动锁仓）；
										<br />
										<br />
										b.
										下载app端InWe钱包（IOS和Android）的用户将获得邀请码，邀请朋友注册app端InWe
										钱包并填写自己的邀请码即可获得额外奖励，即：
										所邀请用户获得空投奖励的ONT的10%；
										<br />
										<br />
										c. 本次活动时间为2018年3月1日至3月3日；
										<br />
										<br />
										d.
										ONT的发放时间将在3月3日后的几周内完成，在Ontology主网上线时会解锁另外50%代币，但具体依赖于Ontology测试网运行情况，时间约为2018年Q2季度）。
										<br />
										<br />
										例如：在app端InWe钱包（IOS和Android）存100个NEO再邀请朋友，将获26个ONT（NEO基金会空投的20个ONT以及
										InWe钱包空投的6个ONT）的空投，还有所邀请用户获得空投的ONT的10%。
									</div>

									<p className="ps">
										注：关闭此页面后，可以至“我的—邀请码”处查看邀请码
									</p>
								</div>
							</div>
						</div>

						<div className="title1">
							<img src={title2} alt="" className="img" />
						</div>
						<div className="mess2">
							<input
								type="text"
								onChange={this.textChange.bind(this)}
							/>
							<button onClick={this.textSubmit.bind(this)}>
								提交
							</button>
						</div>
						<div className="mess3">
							本体（Ontology）是新一代多链式公有链基础平台，同时也是支持分布式信任生态的通用平台。
							ONT将作为本体网络的功能性代币。
							<br />
							<br />
							最后再次感谢大家对InWeCrypto的支持！我们将继续努力，推动InWe
							Wallet发展。
							<br />
							<br />
							通过以下渠道可了解InWe Wallet。
							<br />
							官方网站:inwecrypto.com
							<br />
							电报群（中文）：https://t.me/inwecrypto
						</div>
						<div className="psmess">
							本活动最终解释权归Inwecrypto所有
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
