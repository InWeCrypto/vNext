var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var entries = {};
var rootPath = path.resolve(__dirname, "../src");
entries.app = [rootPath + "/index.js"];
var webpackConfig = {
	entry: entries,
	resolve: {
		extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
		alias: {}
	},
	devServer: {
		historyApiFallback: true
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.html$/,
				use: {
					loader: "underscore-template-loader"
				}
			},

			{
				test: /\.css|less$/,
				use: [
					"style-loader",
					"css-loader",
					"postcss-loader",
					"less-loader"
				]
			},
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: rootPath
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/img/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 10000,
							name: "assets/font/[name].[hash:9].[ext]"
							// publicPath:
							// 	process.env.NODE_ENV === "development"
							// 		? config.dev.assetsPublicPath
							// 		: config.build.assetsPublicPath
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: rootPath + "/index.html"
		})
	]
};

module.exports = webpackConfig;
