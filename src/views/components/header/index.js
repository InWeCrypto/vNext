import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
class Header extends Component {
	render() {
		return (
			<div className="header-box">
				<div className="container ui-box">
					<div className="logo">1</div>
					<div className="middle" />
					<div className="nav">
						<Link className="a" to="">
							NEWS
						</Link>
						<span>|</span>
						<Link className="a" to="">
							ICO评测
						</Link>
						<span>|</span>
						<Link className="a" to="">
							CandyBox
						</Link>
					</div>
					<div className="ctrl">
						<span>2</span>
						<span>|</span>
						<span>中文</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
