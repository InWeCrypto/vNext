import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailIntro extends PureComponent {
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="ProjectDetailIntro ui">
						<div className="projectDetailCon1">
							<div className="projectDetailConTop ui">
								<div className="projectDetailConTopLeft">
									<div className="projectDetailCenter1">
										<div className="projectDetailImg">
											<img src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1515589318224&amp;di=6418f077b77d7451a1246c6cfe793406&amp;imgtype=0&amp;src=http%3A%2F%2Fpic36.nipic.com%2F20131124%2F6608733_084856944000_2.jpg" />
										</div>
										<span>NEO</span>
										<p>Blockchain</p>
									</div>
								</div>
								<div className="projectDetailConTopRight">
									<GaiKuo
										changeLng={changeLng}
										lng={lng}
										projectDetail={projectDetail}
									/>
								</div>
							</div>
							<div className="projectDetailCon1Box">
								<div className="projectDetailCon1BoxTitle">
									项目概述
								</div>
								<div className="introContent">
									<p>
										NEO是一个非盈利的社区化的区块链项目，是利用区块链技术和数字身份进行资
										产数字化，利用智能合约对数字资产进行自动化管理，实现“智能经济”的一种分
										布式网络。NEO于2014年正式立项，2015年6月在Github上实时开源，自成立以
										来，NEO团队亲历了区块链行业的高潮与低谷，数字货币市场的狂热与冷却。我
										们相信，科技是这个时代变迁的原动力，在这股动力的推动下，我们将迈入新
										的“智能经济”时代。
									</p>
									<img
										src="http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=5e310a4ddb09b3deffb2ec2ba4d606f4/9d82d158ccbf6c81887581cdb63eb13533fa4050.jpg"
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
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailIntro;
