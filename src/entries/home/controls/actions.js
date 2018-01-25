import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "HOME_";
export const ARTICLELIST = `${PRE_FIX}ARTICLELIST`;
export const NEWSLIST = `${PRE_FIX}NEWSLIST`;
export const CANDYLIST = `${PRE_FIX}CANDAYLIST`;
export const ADS = `${PRE_FIX}ADS`;
export const EXCHANGENOTICE = `${PRE_FIX}EXCHANGENOTICE`;
export const USERFAVO = `${PRE_FIX}USERFAVO`;

export const getArticleList = createAction(ARTICLELIST, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getNewsList = createAction(NEWSLIST, params => {
	return http
		.get({
			url: "article",
			params: params
		})
		.then(res => {
			return res;
		});
});
export const getCandyList = createAction(CANDYLIST, query => {
	return http.get({
		url: `candy_bow${query}`
	});
});
export const getAds = createAction(ADS, query => {
	return http.get({
		url: "ads"
	});
});
export const getExchangeNotice = createAction(EXCHANGENOTICE, params => {
	return http.get({
		url: "exchange_notice",
		params: params
	});
});
export const getUserFavo = createAction(USERFAVO, params => {
	return http.get({
		url: "category",
		params: params
	});
});
