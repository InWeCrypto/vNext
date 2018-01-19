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
		globData: { lng, userInfo }
	}) => ({
		newsDetail,
		newsDetailCollect,
		newsDetailComment,
		newsDetailCommentL,
		userInfo,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
