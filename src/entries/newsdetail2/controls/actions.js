import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "NEWS_";
export const NEWSDETAIL = `${PRE_FIX}NEWSDETAIL`;
export const NEWSDETAILCOLLECT = `${PRE_FIX}NEWSDETAILCOLLECT`;
export const NEWSDETAILCOMMENT = `${PRE_FIX}NEWSDETAILCOMMENT`;
export const NEWSDETAILCOMMENTL = `${PRE_FIX}NEWSDETAILCOMMENTL`;

export const getNewsDetail = createAction(NEWSDETAIL, params => {
	return http
		.get({
			url: "article/" + params.art_id
		})
		.then(res => {
            
            
			return res;
		});
});
export const getNewsDetailCollect = createAction(NEWSDETAILCOLLECT, params => {
	return http
		.put({
			url: "article/" + params.art_id + "/collect",
			params: { enable: params.enable }
		})
		.then(res => {
			return res;
		});
});
export const getNewsDetailComment = createAction(NEWSDETAILCOMMENT, params => {
	return http
		.post({
			url: "article/" + params.art_id + "/comment",
			params: { content: params.content }
		})
		.then(res => {
			return res;
		});
});
export const getNewsDetailCommentL = createAction(
	NEWSDETAILCOMMENTL,
	params => {
		return http
			.get({
				url: "article/" + params.art_id + "/comment"
			})
			.then(res => {
				return res;
			});
	}
);
