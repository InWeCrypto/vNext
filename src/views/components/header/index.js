import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import logo from "../../../lib/images/logo1.png";
import logo2 from "../../../lib/images/logo2.png";
import logo3 from "../../../lib/images/logo3.png";
import search from "../../../lib/images/search.png";
import search1 from "../../../lib/images/search1.png";
import more from "../../../lib/images/home_more.png";
import more1 from "../../../lib/images/home_more1.png";
import tele from "../../../lib/images/tele.png";
import mail from "../../../lib/images/mail.png";
class Header extends Component {
	constructor() {
		super();
		this.state = {
			isShowMore: false,
			isShowContact: false
		};
	}
	toggleMenu(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			isShowMore: !this.state.isShowMore
		});
	}
	toggleContact(e) {
		e.nativeEvent.stopImmediatePropagation();
		this.setState({
			isShowContact: !this.state.isShowMore
		});
	}
	componentDidMount() {
		Pace.start();
		document.addEventListener(
			"click",
			() => {
				this.setState({
					isShowMore: false,
					isShowContact: false
				});
			},
			false
		);
		let body = document.querySelectorAll("body")[0];
		body.addEventListener(
			"scroll",
			() => {
				let s = body.scrollTop;
				let h = this.refs.headerBox;
				let l = this.refs.logo;
				let se = this.refs.search;
				let c = this.refs.contact;
				let m = this.refs.moreMenu;
				if (s <= 50) {
					h.setAttribute("class", "header-box");
					l.setAttribute("src", logo3);
					se.setAttribute("src", search);
					c.setAttribute("src", more);
					m.setAttribute("src", more);
				} else {
					h.setAttribute("class", "header-box green");
					l.setAttribute("src", logo2);
					se.setAttribute("src", search1);
					c.setAttribute("src", more1);
					m.setAttribute("src", more1);
				}
			},
			false
		);
	}
	render() {
		return (
			<div className="header-container">
				<div className="header-box" ref="headerBox">
					<div className="container-main  ui-box">
						<Link to="/" className="logo">
							<img ref="logo" src={logo3} />
						</Link>
						<div className="middle" />
						<div className="nav">
							{/* <Link
								activeClassName="cur"
								className="a"
								to="/news"
							>
								NEWS
							</Link> */}
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
						<div className="ctrl">
							<span>中文</span>
							<span className="arrow-more" />
						</div>
						<div className="search">
							{/* <input className="search-input" type="search" /> */}
							<span className="searchbtn">
								<img ref="search" src={search} />
							</span>
						</div>
						<div className="more-menu">
							<span onClick={e => this.toggleMenu(e)}>
								<img src={more} ref="moreMenu" />
							</span>
							{this.state.isShowMore && (
								<div className="more-list">
									{/* <Link to="/news" className="more-item">
										NEWS
									</Link> */}
									<Link className="more-item" to="/ico">
										ICO评测
									</Link>
									<Link className="more-item" to="/candybowl">
										CandyBowl
									</Link>
									<a className="more-item" href="">
										email
									</a>
									<a className="more-item" href="">
										telegram
									</a>
								</div>
							)}
						</div>

						<div className="contact-box">
							<span onClick={e => this.toggleContact(e)}>
								<img src={more} ref="contact" />
							</span>
							{this.state.isShowContact && (
								<div className="contact-more">
									<div className="arrow" />
									<div className="contact-list">
										<a className="contact-item">
											<img
												src={mail}
												className="contact-img"
											/>
											<span>email</span>
										</a>
										<a className="contact-item">
											<img
												src={tele}
												className="contact-img"
											/>
											<span className="contact-text">
												telegram
											</span>
										</a>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
