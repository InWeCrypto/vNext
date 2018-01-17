import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";

import "./index.less";

class GaiKuo extends PureComponent {
	constructor() {
		super();
		this.state = {
			showShareList: false,
			remind: true,
			collect: false,
			home: false,
			share: false
		};
	}
	componentWillUnmount() {}
	toggleShareList(e) {
		console.log(this);
		e.stopPropagation();
		this.setState({
			showShareList: !this.state.showShareList
		});
	}
	toggleList(val, e) {
		if (val == "share") {
			this.setState({
				share: !this.state[val]
			});
			this.toggleShareList(e);
		} else {
			val == "remind" &&
				this.setState({
					remind: !this.state[val]
				});
			val == "collect" &&
				this.setState({
					collect: !this.state[val]
				});
			val == "home" &&
				this.setState({
					home: !this.state[val]
				});
		}
	}
	render() {
		const { lng } = this.props;
		const { showShareList, remind, home, collect, share } = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="gaikuo">
						<ul className="gaikuoUl ui">
							<li
								className={
									remind ? "gaikuoRemind cur" : "gaikuoRemind"
								}
								onClick={e => {
									this.toggleList("remind", e);
								}}
							>
								{/* 收藏 官网 分享 */}
								<b className="" />
								<span>提醒</span>
							</li>
							<li
								className={
									collect
										? "gaikuoCollect cur"
										: "gaikuoCollect"
								}
								onClick={e => {
									this.toggleList("collect", e);
								}}
							>
								<b className="" />
								<span>收藏</span>
							</li>
							<li
								className={
									home ? "gaikuoHome cur" : "gaikuoHome"
								}
								onClick={e => {
									this.toggleList("home", e);
								}}
							>
								<b className="" />
								<span>官网</span>
							</li>
							<li
								className={
									share ? "gaikuoShare cur" : "gaikuoShare"
								}
								onClick={e => {
									this.toggleList("share", e);
								}}
							>
								<b className="" />
								<span>分享</span>
							</li>
						</ul>
						{showShareList && (
							<ul className="shareList ui center">
								<li className="wx" />
								<li className="pyq" />
								<li className="tele" />
								<li className="qq" />
							</ul>
						)}
					</div>
				)}
			</I18n>
		);
	}
}
export default GaiKuo;
