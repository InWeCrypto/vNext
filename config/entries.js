var path = require("path");
var fs = require("fs");
var dirSrc = path.resolve(__dirname, "../src/views");
var entriesConfig = [
	{
		entryName: "index",
		entry: path.resolve(dirSrc, "index.js"),
		filename: "index.html",
		template: path.resolve(dirSrc, "index.html")
	}
];
module.exports = {
	entries: entriesConfig,
	assetsRoot: path.resolve(__dirname, "../dist"),
	assetsSubDirectory: "assets",
	commonsChunkName: ["app", "vendor", "pace", "manifest"],
	dev: {
		env: require("./dev.env.js"),
		assetsPublicPath: "/"
	},
	build: {
		env: require("./prod.env.js"),
		// 可配置 CDN
		assetsPublicPath: "/"
	}
};
