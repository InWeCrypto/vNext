import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		candybowl: { candyList, candybow, candyMonth, candyMustList },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		candyMonth,
		candyList,
		candybow,
		userInfo,
		lng,
		candyMustList,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
