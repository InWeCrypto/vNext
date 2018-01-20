import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import React, { PureComponent } from "react";
import Bundle from "../../bundle";
injectReducer("globData", globalReducer);
injectReducer("member", reducers);

const Root = props => {
	return (
		<Bundle load={() => import("./containers/root")}>
			{Root => <Root {...props} />}
		</Bundle>
	);
};

export default Root;
