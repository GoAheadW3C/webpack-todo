const path = require('path');//nodeJs的基本包
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';//我们在启动服务，读取package.json里的脚本的时候，脚本中的环境变量都是存在process.env这个对象下的。比如执行npm run build的时候，读取的就是package.json中script中的"build": "cross-env NODE_ENV=production webpack --config webpack.config.js",那这里可以看到环境变量NODE_ENV的值为production，那这个值就会被存到process.env这个对象下

const config = {
	//webpack的编译目标是web端的
	target:'web',
	// 入口文件，用绝对路径，保证我们不因为路径发生错误
	//path.join(__dirname, 'src/index.js')中__dirname表示当前文件的路径，path.join就是将当前文件的路径跟'src/index.js'拼接起来，形成一个绝对路径
	entry: path.join(__dirname, 'src/index.js'),
	//输出文件，取名为bundle.js，路径为dist文件夹
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
			},
			{
				test:/\.css$/,
				use:[
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.styl/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true//使用stylus-loader会自动生成sourceMap，postcss自己也可以生成sourceMap，当前面已经是sourceMap的时候，postcss是直接使用前面的sourceMap的，这样的好处就是编译的效率会更高一点
						}
					},
					'stylus-loader'//这个loader依赖stylus这个包，所以装的时候还要安装这个stylus
				]
			},
			{
				test:/\.(gif|jpg|jpeg|png|svg)$/,
				use:[
					{
						loader: 'url-loader',//能够将图片转成base64代码直接写在js里面,依赖file-loader，所以在安装的时候不仅要装url-loader还要装file-loader
						options: {
							limit: 1024,//如果文件大小小于1024字节，就会转义成base64,否则仍然是图片
							name: '[name]-aaa.[ext]'//输出文件的名字,name就是原先图片的名字,-aaa是自己家的字段，ext是后缀
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),//一般vue、react等框架都要用到这个插件。
		//在这里定义了，在我们的js代码中是可以引用到的。
		//现在,veu/react这类框架会根据环境去区分打包，打包后的dist在开发环境中是比较大的，因为有很多类似错误的信息们可以帮助我们开发人员开发，而生产环境是比较小的，没有繁多的错误信息，我们也不希望错误信息给用户看，所以就没必要把错误信息打包进去了
		//为什么单引号里面还要双引号？因为如果没有的话，调用的时候，就成了process.env.NODE_ENV = development,这时候development就成了一个变量，所以需要写上双引号
		new HTMLPlugin()
	]
}

if(isDev){
	config.devtool = '#cheap-module-eval-source-map';//帮助我们在页面上调试我们的代码的,并且有很多种source-map的映射方式，不同映射方式有不同的优缺点，这里写的只是其中一种，这个值，可以让你在浏览器看到源码
	config.devServer = {
		port: 8000,
		host: '0.0.0.0',//可以通过localhost,127.0.0.1,本机的内网IP进行访问（IP的话，就可以在别人的电脑上访问）
		overlay: {
			error: true,//如果编译有错误，就直接显示在网页上
		},
		open: true,//启动的时候，自动打开浏览器
		// historyFallback: {   //对于非定义的路由的处理

		// }
		hot: true,//热加载，不需要刷新页面就能加载出来
	}
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()//减少我们不需要的信息的展示
	)
}
module.exports = config;