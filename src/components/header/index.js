import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./index.less";
import SignBox from "../signbox";
import defaultHeader from "../../assets/images/member_img.png";
import headerNews from "../../assets/images/headernews.png";
class Header extends PureComponent {
	constructor() {
		super();
		this.state = {
			showMember: false
		};
		this.changeMember = this.changeMember.bind(this);
		document.addEventListener("click", this.changeMember, false);
	}
	changeMember() {
		this.setState({
			showMember: false
		});
	}
	componentWillUnmount() {
		//重写组件的setState方法，直接返回空
		this.setState = (state, callback) => {
			return;
		};
	}
	toggleMember(e) {
		e.stopPropagation();
		this.setState({
			showMember: !this.state.showMember
		});
	}
	render() {
		const { lng } = this.props;
		const { showMember } = this.state;
		return (
			<div id="headerBox" className="header-box ui start">
				<div className="heder-left ui center">
					<img className="img" src={headerNews} />
					<div className="headernews-box f1">
						<span className="headernews-item">
							BTC $15366 +9.9%
						</span>
					</div>
				</div>
				<div className="heder-middle f1">InWeCrypto</div>
				<div className="heder-right">
					<div
						className="member"
						onClick={e => {
							this.toggleMember(e);
						}}
					>
						<i className="member-info" />
						<img className="img" src={defaultHeader} />
					</div>
					{showMember && (
						<div className="member-more">
							<Link
								to={{
									pathname: "/member",
									search: "?type=message"
								}}
								className="member-item"
							>
								<span className="icon-box">
									<i className="icon-message" />
									<i className="circle" />
								</span>
								<span className="member-itemtext">
									未读消息
								</span>
							</Link>
							<Link
								to={{
									pathname: "/member",
									search: "?type=collection"
								}}
								className="member-item"
							>
								<span className="icon-box">
									<i className="icon-personal" />
								</span>
								<span className="member-itemtext">
									个人中心
								</span>
							</Link>
							<div className="member-item">
								<span className="icon-box">
									<i className="icon-out" />
								</span>
								<span className="member-itemtext">退出</span>
							</div>
						</div>
					)}
					{/* <SignBox /> */}
				</div>
			</div>
		);
	}
}
export default Header;
