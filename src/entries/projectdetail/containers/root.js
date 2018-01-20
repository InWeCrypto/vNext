import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({ projectDetail: { projectDetail }, globData: { lng, userInfo } }) => ({
		projectDetail,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
