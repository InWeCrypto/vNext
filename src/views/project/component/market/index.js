import React, { Component } from "react";
import "./index.less";
class Market extends Component {
	constructor() {
		super();
		this.state = {
			isSHowAll: false,
			showNum: 3
		};
	}
	showMore(num) {
		this.setState({
			isSHowAll: true,
			showNum: num
		});
	}
	render() {
		const { marketData } = this.props;
		return (
			<div className="market-box">
				{marketData &&
					marketData.length > 0 &&
					marketData.map((item, index) => {
						if (index > this.state.showNum) {
							return null;
						}
						return (
							<div key={index} className="market-group">
								<div className="market-item market-t">
									<div className="market-left">
										{item.source}{" "}
										<span className="market-pair">
											{item.pair}
										</span>
									</div>
									<div className="market-right">
										{item.pairce}
									</div>
								</div>
								<div className="market-item">
									<div className="market-left">
										Volume{item["volum_24"]}
									</div>
									<div className="market-right">
										{item.update}
									</div>
								</div>
							</div>
						);
					})}
				{!this.state.isSHowAllisSHowAll &&
					marketData &&
					marketData.length > this.state.showNum && (
						<div
							onClick={this.showMore.bind(
								this,
								marketData.length
							)}
							className="market-more"
						>
							read more>
						</div>
					)}
			</div>
		);
	}
}
export default Market;
