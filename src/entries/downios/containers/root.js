import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "../components/root";
import React from "react";
import Bundle from "../../../bundle";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default withRouter(
	connect(
		({
			home: {
				articleList,
				newsList,
				project,
				candyList,
				ads,
				ads2,
				exchangeNotice,
				userFavo
			},
			globData: { lng, userInfo, commonMarket }
		}) => ({
			articleList,
			newsList,
			project,
			candyList,
			ads,
			ads2,
			exchangeNotice,
			userFavo,
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
