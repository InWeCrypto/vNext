import { handleActions } from "redux-actions";
import { ANNOUNCMENT, ANNOUNCMENTM } from "./actions";

export const announcment = handleActions(
	{
		[ANNOUNCMENT]: (state, { payload }) => payload,
		[ANNOUNCMENTM]: (state, { payload }) => {
			if (payload.data.length >= 10) {
				window.AnnouncmentAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
