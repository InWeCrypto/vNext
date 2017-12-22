import React, { Component } from "react";
import downwalletleft from "../../../lib/images/downwallet_left.png";
import google from "../../../lib/images/google.png";
import apple from "../../../lib/images/apple.png";
import closebtn from "../../../lib/images/close_wallet.png";
import "./index.less";

class DownWallet extends Component {
	constructor(props) {
		super(props);
	}
	closeOwn(e) {
		this.props.closeMethod();
	}
	render() {
		return (
			<div className="downwallet">
				<div
					className="downwallet-cont"
					onClick={e => {
						this.closeOwn();
						e.stopPropagation();
					}}
				>
					<div
						className="downwallet-box"
						onClick={event => {
							event.stopPropagation();
						}}
					>
						<img
							className="downwallet-close"
							onClick={this.closeOwn.bind(this)}
							src={closebtn}
						/>
						<div className="downwallet-item downwallet-left">
							<img src={downwalletleft} />
						</div>
						<div className="downwallet-item downwallet-right">
							<div className="downwallet-title">
								InWeCrypto Wallet
							</div>
							<div className="downwallet-text">
								InWeCrypto是一个多资产钱包，支持BTC，ETH，NEO，以及所有ERC20代币和NEP5代币。多资产统一管理，智能高效，流程简单，同时集成InWeCrypto网站资讯，一手掌握媒体资讯与数字资产安全存储。
							</div>
							<div className="downwallet-down">
								<div className="downwallet-btnbox">
									<a className="downwallet-btn" href="">
										<img src={apple} />
										<span>App Store</span>
									</a>
								</div>
								<div className="downwallet-btnbox">
									<a className="downwallet-btn" href="">
										<img src={google} />
										<span>Google Play</span>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default DownWallet;
