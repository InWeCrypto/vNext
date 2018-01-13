import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight } from "../../../../utils/util";
import Header from "../../../../components/header/";
import FixedMenu from "../../../../components/fixedmenu";
import MemberNav from "../membernav/";
import MemberSet from "../memberset/";
import MemberMessage from "../membermessage/";
import ProjectCollection from "../projectcollection";
import "./index.less";
export default class Root extends PureComponent {
	componentDidMount() {
		document.title = "InWe-个人中心";
		let minH = getMainMinHeight();
		document.querySelector("#mainBox").style.minHeight = minH + "px";
	}
	render() {
		const { lng, changeLng } = this.props;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="member-box">
						<Header lng={lng} />
						{/* <FixedMenu lng={lng} changeLng={changeLng} /> */}
						<div className="member-main">
							<div id="mainBox" className="container ui">
								<div className="member-left">
									<MemberNav lng={lng} />
								</div>
								<div className="member-right f1">
									{/* <MemberSet lng={lng} /> */}
									{/* <MemberMessage lng={lng} /> */}
									<ProjectCollection lng={lng} />
								</div>
							</div>
						</div>
					</div>
				)}
			</I18n>
		);
	}
}
