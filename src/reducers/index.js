import { combineReducers } from "redux";
import { homeInfo } from "./home";
import { newsDetailData } from "./newsdetail";
import { projectData } from "./project";
export default combineReducers({ homeInfo, newsDetailData, projectData });
