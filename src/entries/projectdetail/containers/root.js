import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		projectDetail: {
			projectDetail,
			coinTimePrice,
			projectDynamic,
			projectDynamicList,
			projectDot,
			projectKdata,
			markets
		},
		globData: { lng, userInfo, commonMarket }
	}) => ({
		projectDetail,
		coinTimePrice,
		projectDynamic,
		projectDynamicList,
		projectDot,
		projectKdata,
		markets,
		userInfo,
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
