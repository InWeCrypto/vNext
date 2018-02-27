import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({ newsdetail: {}, globData: { lng, userInfo, commonMarket } }) => ({
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
