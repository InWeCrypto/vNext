import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Root from "../components/root";
import React from "react";
import Bundle from "../../../bundle";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default withRouter(
	connect(
		({ home: { articleList, newsList }, globData: { lng, userInfo } }) => ({
			articleList,
			newsList,
			userInfo,
			lng
		}),
		{
			...actions,
			...globalActions
		}
	)(Root)
);
