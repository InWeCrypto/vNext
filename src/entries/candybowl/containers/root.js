import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		candybowl: { candyList, candyMonth },
		globData: { lng, userInfo }
	}) => ({
		candyMonth,
		candyList,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
