import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default withRouter(
	connect(
		({
			member: { collectionList, quotationList, uoloadKey },
			globData: { lng, userInfo }
		}) => ({
			uoloadKey,
			collectionList,
			quotationList,
			userInfo,
			lng
		}),
		{
			...actions,
			...globalActions
		}
	)(Root)
);
