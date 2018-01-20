import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import React, { PureComponent } from "react";
import Bundle from "../../bundle";
injectReducer("lng", globalReducer);
injectReducer("candybowl", reducers);
const Root = props => {
	return (
		<Bundle load={() => import("./containers/root")}>
			{Root => <Root {...props} />}
		</Bundle>
	);
};
export default Root;
