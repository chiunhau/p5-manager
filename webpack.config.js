const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');

var config = {
	entry: [path.join(__dirname, 'src', 'main')],
	output: {
		publicPath: '/assets/',
		path: path.join(__dirname, 'gui'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader',
			},
			{
				test: /.css$/,
				use: ['vue-style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['vue-style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	plugins: [new webpack.HotModuleReplacementPlugin(), new VueLoaderPlugin()],
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			vue: 'vue/dist/vue.js',
		},
	},
	devServer: {
		inline: true,
		hot: true,
		port: 5555,
		proxy: {
			'/api': {
				target: 'http://localhost:8080',
				secure: false,
			},
		},
		contentBase: './gui',
	},
};

module.exports = config;
