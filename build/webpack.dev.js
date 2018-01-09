var webpack = require("webpack");
var config = require("../config");
var webpackDevConfig = {
	devtool: "cheap-module-source-map",
	output: {
		path: config.outputRoot
	}
};
module.exports = webpackDevConfig;
