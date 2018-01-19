import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({
		member: { collectionList, quotationList },
		globData: { lng, userInfo }
	}) => ({
		collectionList,
		quotationList,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
