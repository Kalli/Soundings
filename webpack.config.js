const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = env => {
	let copyConfig = [
		{ from: 'public' },
	]
	if (env && env.production){
		copyConfig[0]['to'] = 'static/'
	}
	return {
		entry: {
			main: './src/index.js',
			bookmarklet: './src/bookmarklet.js'
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					loader: "babel-loader",
					options: { presets: ["@babel/env"] }
				},
				{
					test: /\.css$/,
			        use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true
							},
						},
			        ],
				}
			]
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist')
		},
		plugins: [
			new CopyWebpackPlugin(copyConfig),
		]
	}
};