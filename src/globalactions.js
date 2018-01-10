import { createAction } from "redux-actions";
export const LNG = "LNG";
export const changeLng = createAction(LNG, lng => {
	return lng;
});
