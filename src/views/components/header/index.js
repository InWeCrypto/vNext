import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import logo from "../../../lib/images/logo1.png";
import search from "../../../lib/images/search.png";
import more from "../../../lib/images/home_more.png";
class Header extends Component {
	constructor() {
		super();
		this.state = {
			isShowMore: false
		};
		//this.toggleMenu = this.toggleMenu.bind(this);
	}
	toggleMenu(e) {
		e.nativeEvent.stopImmediatePropagation();
		//e.nativeEvent.preventDefault();
		this.setState({
			isShowMore: !this.state.isShowMore
		});
	}
	componentDidMount() {
		document.addEventListener(
			"click",
			() => {
				this.setState({
					isShowMore: false
				});
			},
			false
		);
	}
	render() {
		return (
			<div className="header-box">
				<div className="container ui-box">
					<Link to="/" className="logo">
						<img src={logo} />
					</Link>
					<div className="middle" />
					<div className="nav">
						<Link activeClassName="cur" className="a" to="/news">
							NEWS
						</Link>
						<Link activeClassName="cur" className="a" to="/ico">
							ICO评测
						</Link>
						<Link
							activeClassName="cur"
							className="a"
							to="/candybowl"
						>
							CandyBowl
						</Link>
					</div>
					<div className="search">
						<input className="search-input" type="search" />
						<span className="searchbtn">
							<img src={search} />
						</span>
					</div>
					<div className="ctrl">
						<span>中文</span>
						<span className="arrow-more" />
					</div>
					<div className="more-menu">
						<span onClick={e => this.toggleMenu(e)}>
							<img src={more} />
						</span>
						{this.state.isShowMore && (
							<div className="more-list">
								<Link to="/news" className="more-item">
									NEWS
								</Link>
								<Link className="more-item" to="/ico">
									ICO评测
								</Link>
								<Link className="more-item" to="/candybowl">
									CandyBowl
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
