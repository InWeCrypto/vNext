import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import GaiKuo from "../../../../components/gaikuo";
import "./index.less";
class ProjectDetailInfo extends PureComponent {
	render() {
		const { lng, changeLng, projectDetail } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="projectDetailInfo ui">
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
									/>
								</div>
							</div>
							<div className="projectDetailCon1Box">
								<ul className="ui">
									<li>
										<div className="imgBox">
											<img
												src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516195691228&di=92e63d9f27a65d105a43eb5847a1ae6f&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2F1312%2F0827%2F0827-niutuku.com-13638.jpg"
												alt=""
											/>
										</div>
										<div className="infoBot">
											<p className="infoBotTitle ellitext">
												新韩银行推出跨境比特币服务
											</p>
											<div className="infoBotDate">
												<span>2017-11-16 11:35:33</span>
												<i>原创</i>
											</div>
										</div>
									</li>
									<li className="infoVideo">
										<div className="imgBox">
											<img
												src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516195691228&di=92e63d9f27a65d105a43eb5847a1ae6f&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2F1312%2F0827%2F0827-niutuku.com-13638.jpg"
												alt=""
											/>
										</div>
										<div className="infoBot">
											<p className="infoBotTitle ellitext">
												新韩银行推出跨境比特币服务
											</p>
											<div className="infoBotDate">
												<span>2017-11-16 11:35:33</span>
												<i>原创</i>
											</div>
										</div>
									</li>
									<li>
										<div className="imgBox">
											<img
												src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516195691228&di=92e63d9f27a65d105a43eb5847a1ae6f&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2F1312%2F0827%2F0827-niutuku.com-13638.jpg"
												alt=""
											/>
										</div>
										<div className="infoBot">
											<p className="infoBotTitle ellitext">
												新韩银行推出跨境比特币服务
											</p>
											<div className="infoBotDate">
												<span>2017-11-16 11:35:33</span>
												<i>原创</i>
											</div>
										</div>
									</li>
									<li className="infoVideo">
										<div className="imgBox">
											<img
												src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516195691228&di=92e63d9f27a65d105a43eb5847a1ae6f&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2F1312%2F0827%2F0827-niutuku.com-13638.jpg"
												alt=""
											/>
										</div>
										<div className="infoBot">
											<p className="infoBotTitle ellitext">
												新韩银行推出跨境比特币服务
											</p>
											<div className="infoBotDate">
												<span>2017-11-16 11:35:33</span>
												<i>原创</i>
											</div>
										</div>
									</li>
								</ul>
								<div className="pageTurn">
									<span className="pageTurmLf" />
									<span className="pageTurmRt more" />
								</div>
							</div>
						</div>
						<div className="projectDetailCon2">
							<div className="projectDetailCon2Box">
								<div className="projectDetailCon2Title">
									项目快讯
								</div>
								<ul className="projectDetailCon2Ul">
									<li className="">
										纽约州议员提出四项区块链技术相关法案…
									</li>
									<li className="">
										纽约州议员提出四项区块链技术相关法案…
									</li>
									<li className="">
										纽约州议员提出四项区块链技术相关法案…
									</li>
									<li className="">
										纽约州议员提出四项区块链技术相关法案…
									</li>
								</ul>
								<div className="pageTurn">
									<span className="pageTurmLf" />
									<span className="pageTurmRt more" />
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default ProjectDetailInfo;
