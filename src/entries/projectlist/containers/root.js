import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		projectlist: {
			project,
			icorank,
			project2,
			project3,
			project4,
			projectCollect
		},
		globData: { lng, userInfo, commonMarket }
	}) => ({
		project,
		icorank,
		project2,
		project3,
		project4,
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
