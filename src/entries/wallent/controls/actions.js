import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "WALLENT_";
export const WALLENT = `${PRE_FIX}WALLENT`;

export const getWallent = createAction(WALLENT, params => {
	return http.get({
		url: "",
		params: params
	});
});
