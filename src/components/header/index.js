import React, { PureComponent } from "react";
import "./index.less";
class Header extends PureComponent {
	componentDidMount() {}
	render() {
		return (
			<div className="header-box ui start">
				<div className="heder-left">1</div>
				<div className="heder-middle f1">2</div>
				<div className="heder-right">3</div>
			</div>
		);
	}
}
export default Header;
