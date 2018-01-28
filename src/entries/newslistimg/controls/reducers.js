import { handleActions } from "redux-actions";
import { NEWSIMGL, NEWSVIDEOL, NEWSIMGM, NEWSVIDEOM } from "./actions";

export const newsImg = handleActions(
	{
		[NEWSIMGL]: (state, { payload }) => {
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
		[NEWSVIDEOL]: (state, { payload }) => {
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
