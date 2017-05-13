process.noDeprecation = true
var path = require('path');
module.exports = {
	cache: true,
	devtool: 'eval',
	entry: './app.js',
	output: {
		path: path.join(__dirname, "build"),
		filename: 'build.min.js'
	},
	module: {
	    loaders: [
			{
	    		test: /\.jsx?$/,
	    		loader: 'babel-loader',
	    		exclude: /node_modules/,
	    		query: {
	      			presets: ['es2015', 'react']
	    		}
		  	},
		  	{
	            test: /\.css$/,
	            loader: "style!css"
	        },
	        {
	            test: /\.png$/,
	            loader: "file-loader"
			},
			{
	            test: /\.wav$/,
	            loader: "file-loader"
			}
		]
	}
}
