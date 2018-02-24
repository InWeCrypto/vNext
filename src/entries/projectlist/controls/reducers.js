import { handleActions } from "redux-actions";
import {
	PROJECT,
	PROJECT2,
	ICORANK,
	PROJECT3,
	PROJECT4,
	PROJECTM,
	PROJECTM2,
	PROJECTM3,
	PROJECTM4,
	PROJECTCOLLECT
} from "./actions";

export const project = handleActions(
	{
		[PROJECT]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: data };
		},
		[PROJECTM]: (state, { payload }) => {
			//
			if (payload.data.length >= 15) {
				window.NavFristAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
export const icorank = handleActions(
	{
		[ICORANK]: (state, { payload }) => {
			return payload;
		}
	},
	[]
);
export const project2 = handleActions(
	{
		[PROJECT2]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: data };
		},
		[PROJECTM2]: (state, { payload }) => {
			//
			if (payload.data.length >= 15) {
				window.NavSecondAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
export const project3 = handleActions(
	{
		[PROJECT3]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: data };
		},
		[PROJECTM3]: (state, { payload }) => {
			//
			if (payload.data.length >= 15) {
				window.NavThirdAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
export const project4 = handleActions(
	{
		[PROJECT4]: (state, { payload }) => {
			return payload;
		},
		[PROJECTCOLLECT]: (state, { payload }) => {
			let data = state.data.map((item, index) => {
				if (item.id === payload.category_id) {
					item.category_user = payload;
				}
				return item;
			});

			return { ...state, data: data };
		},
		[PROJECTM4]: (state, { payload }) => {
			//
			if (payload.data.length >= 15) {
				window.NavForthAjaxDone = true;
			}
			return {
				...payload,
				data: [...state.data, ...payload.data]
			};
		}
	},
	[]
);
