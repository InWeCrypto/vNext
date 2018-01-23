import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		projectDetail: { projectDetail, coinTimePrice },
		globData: { lng, userInfo }
	}) => ({
		projectDetail,
		coinTimePrice,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
