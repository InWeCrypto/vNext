import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
//({ home: { categoryList } }) => ({
//    categoryList
//newsList
//}),
export default connect(
	({ home: { newsList }, lng: { lng } }) => ({
		newsList,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
