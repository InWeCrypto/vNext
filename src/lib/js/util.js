const util = {
	getQuery(query) {
		let res = {};
		let arr = query.split("?")[1].split("&");
		arr.map(item => {
			let s = item.split("=");
			res[s[0]] = s[1];
		});
		return res;
	}
};
(function(window, undefined) {
	window.util = util;
})(window);
