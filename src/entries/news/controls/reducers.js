import { handleActions } from "redux-actions";
import {
	NEWSTEXT,
	NEWSIMG,
	NEWSVIDEO,
	NEWSTEXTM,
	NEWSIMGM,
	NEWSVIDEOM
} from "./actions";

export const newsText = handleActions(
	{
		[NEWSTEXT]: (state, { payload }) => {
			return payload;
		},
		[NEWSTEXTM]: (state, { payload }) => {
			if (payload.data.length >= 10) {
				window.NewNavTextAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
export const newsImg = handleActions(
	{
		[NEWSIMG]: (state, { payload }) => {
			return payload;
		},
		[NEWSIMGM]: (state, { payload }) => {
			if (payload.data.length >= 10) {
				window.NewNavImgAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
export const newsVideo = handleActions(
	{
		[NEWSVIDEO]: (state, { payload }) => {
			return payload;
		},
		[NEWSVIDEOM]: (state, { payload }) => {
			if (payload.data.length >= 10) {
				window.NewNavVideoAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
