import { createAction } from "redux-actions";
import http from "../../../utils/ajax";

const PRE_FIX = "PROJECTDETAIL_";
export const PROJECTDETAIL = `${PRE_FIX}PROJECTDETAIL`;

export const getProjectDetail = createAction(PROJECTDETAIL, params => {
	return http
		.get({
			url: "category/" + params.c_id
		})
		.then(res => {
			console.log(res);
			return res;
		});
});
