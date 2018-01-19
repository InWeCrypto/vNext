import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({
		member: { collectionList, quotationList, uploadKey },
		globData: { lng, userInfo }
	}) => ({
		uploadKey,
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
