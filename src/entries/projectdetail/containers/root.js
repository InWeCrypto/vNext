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
			projectDynamicList
		},
		globData: { lng, userInfo }
	}) => ({
		projectDetail,
		coinTimePrice,
		projectDynamic,
		projectDynamicList,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
