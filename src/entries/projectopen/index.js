import Root from "./containers/root";
import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import * as globalReducer from "../../globalreducer";
import React, { PureComponent } from "react";

injectReducer("lng", reducers);
injectReducer("projectopen", reducers);

export default Root;
