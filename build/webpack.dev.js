var webpack = require("webpack");
var config = require("../config");
var webpackDevConfig = {
	devtool: "cheap-module-source-map",
	output: {
		path: config.outputRoot,
		filename: "[name].js"
	}
};
module.exports = webpackDevConfig;
