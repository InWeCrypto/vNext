import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";

export default connect(
	({
		news: { newsText, newsImg, newsVideo },
		globData: { lng, userInfo, commonMarket }
	}) => ({
		newsText,
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
