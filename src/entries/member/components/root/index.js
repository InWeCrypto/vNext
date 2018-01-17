import React, { PureComponent } from "react";
import { I18n, Trans } from "react-i18next";
import { getMainMinHeight, getQuery } from "../../../../utils/util";
import Header from "../../../../components/header/";
import FixedMenu from "../../../../components/fixedmenu";
import MemberNav from "../membernav/";
import MemberSet from "../memberset/";
import MemberMessage from "../membermessage/";
import ProjectCollection from "../projectcollection";
import MemberQuotation from "../memberquotation";
import EmailCode from "../../../../components/emailcode/";
import ResetPassword from "../../../../components/resetpassword/";
import MessageDetail from "../messagedetail/";
import "./index.less";
export default class Root extends PureComponent {
	constructor() {
		super();
		this.state = {
			cur: "",
			set: false,
			news: false,
			message: false,
			collection: false,
			quotation: false,
			email: false,
			resetP: false,
			messageDetail: false
		};
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search != this.props.location.search) {
			this.initPage(nextProps.location.search);
		}
	}
	componentDidMount() {
		document.title = "InWe-个人中心";
		let minH = getMainMinHeight();
		document.querySelector("#mainBox").style.minHeight = minH + "px";
		this.initPage(this.props.location.search);
	}
	initPage(location) {
		let p = getQuery(location);
		if (
			p.type &&
			["set", "message", "news", "collection", "quotation"].indexOf(
				p.type
			) != -1
		) {
			this.setShowItem(p.type);
		}
	}
	setShowItem(type) {
		let set = {
			set: false,
			news: false,
			message: false,
			collection: false,
			quotation: false
		};
		set[type] = true;
		set["cur"] = type;
		this.setState(set);
	}
	changeSendEmail(data) {
		this.setState({
			email: data
		});
	}
	render() {
		const { lng, changeLng, sendEmailCode } = this.props;
		const {
			set,
			message,
			collection,
			quotation,
			cur,
			email,
			resetP
		} = this.state;
		return (
			<I18n>
				{(t, { I18n }) => (
					<div className="member-box">
						<Header sendEmailCode={sendEmailCode} lng={lng} />
						{/* <FixedMenu lng={lng} changeLng={changeLng} /> */}
						<div className="member-main">
							<div id="mainBox" className="container ui">
								<div className="member-left">
									<MemberNav cur={cur} lng={lng} />
								</div>
								<div className="member-right f1">
									{set && (
										<MemberSet
											changeSendEmail={this.changeSendEmail.bind(
												this
											)}
											lng={lng}
										/>
									)}
									{message && <MemberMessage lng={lng} />}
									{collection && (
										<ProjectCollection lng={lng} />
									)}
									{quotation && <MemberQuotation lng={lng} />}
								</div>
							</div>
						</div>
						{email && (
							<EmailCode
								changeSendEmail={this.changeSendEmail.bind(
									this
								)}
								lng={lng}
							/>
						)}
						{resetP && <ResetPassword lng={lng} />}
						<FixedMenu lng={lng} changeLng={changeLng} />
						{/* <MessageDetail lng={lng} /> */}
					</div>
				)}
			</I18n>
		);
	}
}
