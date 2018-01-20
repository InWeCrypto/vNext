import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailGaiKuo extends PureComponent {
	render() {
		const { lng, changeLng, projectDetail } = this.props;
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
									<GaiKuo changeLng={changeLng} lng={lng} />
								</div>
							</div>
							<div className="projectDetailCon1Box">
								<div className="gaiKuoMoney downs">
									<span>$ 50.00</span>
									<i>(-0.06%)</i>
									<b />
								</div>
								<p className="volume">
									Volume (24h)：$59,907,000 USD
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
											<td>01</td>
											<td>$78.05 milion</td>
											<td>7.85 milion NEO</td>
											<td>7.85 milion NEO</td>
											<td>$20.00</td>
										</tr>
									</tbody>
								</table>
								<div className="gaiKuoChart">111</div>
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
								<p>+Neotracker.io</p>
								<p>+Neotracker.io</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Wallet
								</div>
								<p>+Im token</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Token Holders
								</div>
								<p className="viewMore">view more</p>
							</div>
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									Social
								</div>
								<ul className="shareList ui center">
									<li className="tele" />
									<li className="wx" />
									<li className="mail" />
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
