import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		candybowl: { candyList, candyMonth },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		candyMonth,
		candyList,
		userInfo,
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
