import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({ candybowl: { newsList }, globData: { lng, userInfo } }) => ({
		newsList,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
