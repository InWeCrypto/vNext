import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import React from "react";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default withRouter(
	connect(
		({
			member: {
				collectionList,
				quotationList,
				uoloadKey,
				memberNewsList
			},
			globData: { lng, userInfo, commonMarket }
		}) => ({
			uoloadKey,
			memberNewsList,
			collectionList,
			quotationList,
			userInfo,
			lng,
			commonMarket
		}),
		{
			...actions,
			...globalActions
		}
	)(Root)
);
