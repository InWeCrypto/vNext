import { connect } from "react-redux";
import Root from "../components/root";
import * as actions from "../controls/actions";
import * as globalActions from "../../../globalactions";
export default connect(
	({ candybowl: { newsList }, lng: { lng } }) => ({
		newsList,
		lng
	}),
	{
		...actions,
		...globalActions
	}
)(Root);
