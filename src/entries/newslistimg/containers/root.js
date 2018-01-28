import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({
		trading: { newsImg, newsVideo },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		newsImg,
		newsVideo,
		userInfo,
		lng,
		commonMarket
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
