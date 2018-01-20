import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailIco extends PureComponent {
	render() {
		const { lng, changeLng, projectDetail } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailIco ui">
						<div className="projectDetailCon1">
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
										<span>Active</span>
										<p>
											Token Sale<i>ends in 4 DAYS</i>
										</p>
									</div>
								</div>
								<div className="projectDetailConTopRight">
									<GaiKuo changeLng={changeLng} lng={lng} />
								</div>
							</div>
							<div className="projectDetailCon1Box ui">
								<div className="projectDetailCon1BoxLeft">
									<div className="projectDetailCon1BoxLeftDate">
										<b />
										<p>12.22-01.02</p>
									</div>
									<ul>
										<li>Ticker: LOCICOIN</li>
										<li>Token type: ERC20 ICO</li>
										<li>
											Token Price: 1 LOCICOIN = 0.44 USD
										</li>
										<li>
											Fundraising Goal: 19,000,000 USD
										</li>
										<li>Sold on pre-sale: 1,661,884 USD</li>
										<li>Total Tokens: 100,000,000</li>
										<li>Available for Token Sale: 50%</li>
										<li>
											Bonus for the First: 25% DISCOUNT
										</li>
										<li>
											Min/Max Personal Cap: 0.1 ETH / TBA
										</li>
										<li>Accepts: ETH</li>
									</ul>
								</div>
								<div className="projectDetailCon1BoxRight">
									<div className="projectDetailCon1BoxRightTit">
										ICO 结构
									</div>
									<ul>
										<li>
											<b />
											<span>25%用于团队建设</span>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Rank
								</div>
								<p>+关注热度：第1名</p>
								<p>+用户评分：4.5</p>
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
											return;
											<Link
												to={{
													pathname: item.url
												}}
											>
												<p>+{item.name}</p>
											</Link>;
										}
									)}
								{/* <p>+qtumexplorer.io</p> */}
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
											return;
											<Link
												to={{
													pathname: item.url
												}}
											>
												<p>+{item.name}</p>
											</Link>;
										}
									)}
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
