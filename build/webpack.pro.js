var webpack = require("webpack");
var config = require("../config");
var webpackProConfig = {
	// entry: {
	// 	vendor: [
	// 		"react",
	// 		"react-router-dom",
	// 		"redux",
	// 		"react-redux",
	// 		"redux-actions",
	// 		"react-router-redux"
	// 	]
	// },
	output: {
		path: config.outputRoot,
		filename: "assets/js/[name].[chunkhash:9].js",
		publicPath: "/"
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false // remove all comments
			},
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.CommonsChunkPlugin(["pace", "message", "vendor"])
	]
};

module.exports = webpackProConfig;
