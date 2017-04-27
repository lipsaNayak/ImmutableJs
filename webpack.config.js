module.exports = {
	entry: ['./V12-UsingImmutableForAReactComponent.js'],
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.es6'
		]
	}
}