import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		projectopen: { project, icorank, projectCollect },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		project,
		icorank,
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
