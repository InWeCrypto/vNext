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
				candyList,
				ads,
				exchangeNotice,
				userFavo
			},
			globData: { lng, userInfo, commonMarket }
		}) => ({
			articleList,
			newsList,
			candyList,
			ads,
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
