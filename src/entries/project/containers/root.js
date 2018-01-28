import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		project: { project, projectCollect },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		project,
		projectCollect,
		userInfo,
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
