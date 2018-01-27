export const getQuery = query => {
	let res = {};
	if (!query || query.length === 0) {
		return {};
	}
	let arr = query.split("?")[1].split("&");
	arr.forEach(item => {
		let s = item.split("=");
		res[s[0]] = s[1];
	});
	return res;
};
export const getMainMinHeight = () => {
	let header = parseInt(
		document.getElementById("headerBox").offsetHeight,
		10
	);
	let footer =
		document.getElementById("footerBox") &&
		parseInt(document.getElementById("footerBox").offsetHeight, 10);
	let wh = parseInt(window.innerHeight, 10);
	return wh - header - footer;
};
export const formatTimeToChina = t => {
	if (!t) {
		return "";
	}
	t = t.replace("Z", " ") + "Z";
	let now = new Date().getTime();
	let last = new Date(t).getTime();
	let space = parseInt((now - last) / 1000, 10);
	if (space > 60 * 60 * 24 * 30) return "一个月以前";
	if (space > 60 * 60 * 24 * 15) return "十五天以前";
	if (space > 60 * 60 * 24 * 7) return "一周以前";

	if (space > 60 * 60 * 24 * 6) return "六天以前";
	if (space > 60 * 60 * 24 * 5) return "五天以前";
	if (space > 60 * 60 * 24 * 4) return "四天以前";
	if (space > 60 * 60 * 24 * 3) return "三天以前";
	if (space > 60 * 60 * 24 * 2) return "两天以前";
	if (space > 60 * 60 * 24) return "一天以前";

	if (space > 60 * 60 * 12) return "十二小时以前";
	if (space > 60 * 60 * 6) return "六小时以前";
	if (space > 60 * 60 * 3) return "三小时以前";
	if (space > 60 * 60 * 2) return "两小时以前";
	if (space > 60 * 60) return "一小时以前";

	if (space > 60 * 30) return "半小时以前";
	if (space > 60 * 10) return "十分钟以前";
	if (space > 60 * 5) return "五分钟以前";
	if (space > 60 * 3) return "三分钟以前";
	if (space > 60) return "一分钟以前";
	return "刚刚";
};
export const setLocalItem = (key, value, ms) => {
	var curTime = new Date().getTime;
	var extime = null;
	if (ms) {
		extime = key + ms;
	}

	localStorage.setItem(key, JSON.stringify({ data: value, extime: extime }));
};
export const getLocalItem = key => {
	var item = JSON.parse(localStorage.getItem(key));
	if (!item) {
		return null;
	}
	if (!item.extime) {
		return item;
	}
	var curTime = new Date().getTime();
	if (curTime - item.extime <= 0) {
		localStorage.removeItem(key);
		return null;
	} else {
		return item;
	}
};
//cdy
export const remFun = () => {
	if (IsTouchDevice) {
		var dw = document.body.clientWidth;
		dw = dw * 100 / 750;
		document.getElementsByTagName("html")[0].style.fontSize = dw + "px";
	}
};
export const addClass = (ele, cls) => {
	if (!hasClass(ele, cls)) {
		ele.className = ele.className == "" ? cls : ele.className + " " + cls;
	}
};
export const hasClass = (ele, cls) => {
	cls = cls || "";
	if (cls.replace(/\s/g, "").length == 0) return false; //当cls没有参数时，返回false
	return new RegExp(" " + cls + " ").test(" " + ele.className + " ");
};
export const removeClass = (ele, cls) => {
	if (hasClass(ele, cls)) {
		var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
		ele.className = ele.className.replace(reg, " ");
	}
};
export const chargeFooterFixed = () => {
	let headerDom = document.getElementById("headerBox");
	let headerHei = headerDom.offsetHeight;
	let footerDom = document.getElementById("footerBox");
	let footerHei = footerDom.offsetHeight;
	let rootDom = document.getElementById("root");
	let rootHei = rootDom.offsetHeight;
	let screenHei = document.documentElement.clientHeight;
	//if (rootHei < screenHei) {

	document.getElementById("mainBox").style.minHeight =
		screenHei - footerHei - headerHei + "px";
	// } else {
	// 	return false;
	// }
};
export const getLocalTime = time => {
	let time1 = time.replace(" ", "Z") + "Z";
	const def = new Date().getTimezoneOffset();
	let localTime = new Date(time1).getTime(); //+ def * 60 * 1000;
	let d = new Date(localTime);
	let year = d.getFullYear();
	let month = d.getMonth() + 1;
	let day = d.getDate();
	let hours = d.getHours();
	let min = d.getMinutes();
	let s = d.getSeconds();
	return `${year}-${month}-${day} ${hours}:${min}:${s}`;
};
export const queryString = (name, notDecoded) => {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	var results = regex.exec(location.search);
	var encoded = null;

	if (results === null) {
		return "";
	} else {
		encoded = results[1].replace(/\+/g, " ");
		if (notDecoded) {
			return encoded;
		}
		return decodeURIComponent(encoded);
	}
};
