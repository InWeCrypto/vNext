import { combineReducers } from "redux";
import { homeInfo } from "./home";
import { newsDetailData } from "./newsdetail";
import { projectData } from "./project";
import { icoData } from "./ico";
import { icoDetailData } from "./icodetail";
export default combineReducers({
	homeInfo,
	newsDetailData,
	projectData,
	icoData,
	icoDetailData
});
