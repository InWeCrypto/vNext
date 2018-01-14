import React, { PureComponent } from "react";
import { Pagination } from "antd";
import { I18n, Trans } from "react-i18next";
import "./index.less";
class MemberQuotation extends PureComponent {
	componentDidMount() {
		setTimeout(() => {
			let boxH = document.querySelector("#quotationBox").offsetHeight;
			let pageH = document.querySelector("#PagationBox").offsetHeight;
			document.querySelector("#quotationList").style.height =
				boxH - pageH + "px";
		}, 0);
	}
	render() {
		return (
			<I18n>
				{(t, { I18n }) => (
					<div id="quotationBox" className="quotation-box">
						<div id="quotationList" className="quotation-list">
							<div className="quotation-group ui center">
								<i className="icon remind" />
								<div className="project-icon">
									<img src="https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=808359306,1067189778&fm=173&s=21D25B805CA2A11DECAF0409030070D2&w=218&h=146&img.JPEG" />
								</div>
								<div className="f1 price-box">
									<div className="price-cont">
										<div className="t1">
											$50
											<span className="up">(+0.06)</span>
										</div>
										<div className="t2">≈0.5BTC</div>
									</div>
								</div>
								<div className="other">
									<div className="t1">Above</div>
									<div className="t2">$232.00</div>
								</div>
								<div className="other">
									<div className="t1">Below</div>
									<div className="t2">$232.00</div>
								</div>
							</div>
						</div>
						<div id="PagationBox" className="pagination-box">
							<Pagination efaultCurrent={5} total={500} />
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
export default MemberQuotation;
