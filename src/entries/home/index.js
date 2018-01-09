import Root from "./containers/root";
import { injectReducer } from "../../utils/injectReducer";
import * as reducers from "./controls/reducers";
import React, { PureComponent } from "react";

injectReducer("home", reducers);

export default Root;
