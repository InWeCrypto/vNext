import { handleActions } from "redux-actions";
import { ANNOUNCMENT, CLEAR } from "./actions";

export const announcment = handleActions(
	{
		[ANNOUNCMENT]: (state, { payload }) => {
			const { data } = state;
			/*
			 * 假数据测试
			 * var test = {"id":895,"category_id":0,"type":9,"title":"asd","author":null,"img":null,"url":null,"video":null,"desc":"dd","lang":"zh","is_hot":false,"is_top":false,"is_scroll":false,"is_sole":false,"created_at":"2018-03-22 08:03:17","updated_at":"2018-03-22 08:03:17","click_rate":0,"category":null};
			for (var i = 1; i<20;  i++) {
				test.title = 'ceshi---'+i;
				payload.data.push({...test});
			}*/
			return {
				...state,
				data: data.concat(payload.data),
			};
		},
		[CLEAR]: (state, { payload }) => {
			return {
				...state,
				data: [],
			};
		},
	},
	{
		data:[]
	}
);
