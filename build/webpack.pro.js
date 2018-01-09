var webpack = require("webpack");
var config = require("../config");
var webpackProConfig = {
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].[chunkhash:9].js"
	}
};
module.exports = webpackProConfig;
