import React, { PureComponent } from "react";
import "./index.less";
class Header extends PureComponent {
	componentDidMount() {}
	render() {
		return (
			<div className="header-box ui start">
				<div className="heder-left">1</div>
				<div className="heder-middle f1">InWeCrypto</div>
				<div className="heder-right">
					<div className="member">
						<i className="member-info" />
					</div>
					<div className="member-more">
						<div className="member-item">
							<i>22</i>
							<span className="member-itemtext">222</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Header;
