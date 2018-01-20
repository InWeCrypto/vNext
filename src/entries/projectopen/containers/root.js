import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		projectopen: { project, projectCollect },
		globData: { lng, userInfo }
	}) => ({
		project,
		projectCollect,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
