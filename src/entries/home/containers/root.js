import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
//({ home: { categoryList } }) => ({
//    categoryList
//}),
export default connect(
	({ home: { newsList } }) => ({
		newsList
	}),
	{
		...actions
	}
)(Root);
