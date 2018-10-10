const autoprefixer = require('autoprefixer');//自动补全样式内核

//postcss是帮助我们后处理css的，也就是我们的css已经编译完成了(stylus变成css完成)之后，再通过postcss去优化我们的css代码，优化的过程，就是通过一系列的组件去优化，比如autoprefixer，这个组件就是用来帮助我们添加样式内核前缀的，比如-webkit-，-o-等
module.exports = {
	plugins: [
		autoprefixer()//这是一个方法，要记得调用
	]
}