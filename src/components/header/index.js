import React, { PureComponent } from "react";
import "./index.less";
import defaultHeader from "../../assets/images/member_img.png";
class Header extends PureComponent {
	constructor() {
		super();
		this.state = {
			showMember: false
		};
		document.addEventListener("click", () => {
			this.setState({
				showMember: false
			});
		});
	}
	componentDidMount() {}
	toggleMember(e) {
		e.stopPropagation();
		this.setState({
			showMember: !this.state.showMember
		});
	}
	render() {
		const { showMember } = this.state;
		return (
			<div className="header-box ui start">
				<div className="heder-left">1</div>
				<div className="heder-middle f1">InWeCrypto</div>
				<div className="heder-right">
					<div
						className="member"
						onClick={e => {
							this.toggleMember(e);
						}}
					>
						<i className="member-info" />
					</div>
					{showMember && (
						<div className="member-more">
							<div className="member-item">
								<i>22</i>
								<span className="member-itemtext">
									未读消息
								</span>
							</div>
							<div className="member-item">
								<i>22</i>
								<span className="member-itemtext">
									个人中心
								</span>
							</div>
							<div className="member-item">
								<i>22</i>
								<span className="member-itemtext">退出</span>
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
}
export default Header;
