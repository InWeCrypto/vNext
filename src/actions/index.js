import {
	getInfoListAction,
	getProjectListAction,
	getNewsListAction,
	getBannerListAction,
	changeProjectStateAction,
	getCandyDataAction
} from "./home";
import { getNewsDetailAction, getNewNewsListAction } from "./newsdetail";

import {
	getProjectDetailAction,
	getTimePriceAction,
	getKDataAction,
	changeKTypeAction,
	getMarketDataAction,
	changeInewsIndex,
	getVideoListAction,
	getImgTxtListAction,
	getProjectNewsListAction,
	resetProjectAction
} from "./project";

import { getIcoListAction } from "./ico";
import { getIcoDetailAction } from "./icodetail";

export default {
	//首页
	getInfoListAction,
	getProjectListAction,
	getNewsListAction,
	getBannerListAction,
	changeProjectStateAction,
	getCandyDataAction,
	//新闻详情
	getNewsDetailAction,
	getNewNewsListAction,
	//项目
	getProjectDetailAction,
	getTimePriceAction,
	getKDataAction,
	changeKTypeAction,
	getMarketDataAction,
	changeInewsIndex,
	getVideoListAction,
	getImgTxtListAction,
	getProjectNewsListAction,
	resetProjectAction,
	//ico
	getIcoListAction,
	//ico详情
	getIcoDetailAction
};
