import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({
		newsdetail: {
			newsDetail,
			newsDetailCollect,
			newsDetailComment,
			newsDetailCommentL
		},
		globData: { lng, userInfo, commonMarket }
	}) => ({
		newsDetail,
		newsDetailCollect,
		newsDetailComment,
		newsDetailCommentL,
		userInfo,
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
