# webpack 相关知识
## webpack 中的关键模块？
- entry：入口文件配置。
- output：输出文件配置。
- loader：实现对不同格式的文件处理。（比如将 scss 转换为 css、ES6以上的语法转换为 ES5等）。
- plugins：用于解决 loader 不能解决的事情，着眼于功能上的处理，使 webpack 更灵活。

## webpack 中常见的 loader 有哪些？:star2:
- babel-loader：加载 ES2015+ 代码，然后使用 Babel 转译为 ES5。
- postcss-loader：使用 PostCSS 加载和转译 CSS 文件。（用于增加 CSS 兼容性标识）
- css-loader：解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码。
- style-loader：将模块的导出作为样式添加到 DOM 中。
- file-loader：将文件打包到输出文件夹。（常用于处理图片）
- url-loader：将文件打包到输出文件夹，但是存在大小限制。
loader 的执行顺序是从后往前的

## webpack 中常见的 plugin 有哪些？:star2:
- 优化相关：
	- commons-chunk-plugin：用于提取公共代码。
	- extract-text-webpack-plugin：从 bundle 中提取文本（CSS）到单独的文件。
	- mini-css-extract-plugin：上边的升级版本（增加了异步加载、没有重复编译，但是 webpack4 版本以上才可用）
	- uglifyjs-webpack-plugin：通过 UglifyES 压缩 ES6+ 代码。
	- webpack-parallel-uglify-plugin：多进程执行 UglifyJS 代码压缩，提升构建速度。
	- hot-module-replacement-plugin：启用模块热替换。
	- optimize-css-assets-webpack-plugin：压缩 CSS 代码。
	- purifycss-webpack：去除无用的 CSS 代码。（CSS 的 TreeShaking）
- 功能相关：
	- html-webpack-plugin：创建 HTML 文件。（配置多文件也可以使用）
	- NoEmitOnErrorsPlugin：在输出阶段时，遇到编译错误跳过。

## loader 和 plugin 之间的区别？
- loader 模块转换器。是用来告诉 webpack 如何转化处理某一类型的文件，并且引入到打包出的文件中。
- plugin 扩展插件。是用来自定义 webpack 打包过程的方式，参与 webpack 打包的整个流程，用于 webpack 功能的扩展。

## 什么是 bundle、chunk、module？
- bundle：是由 webpack 打包出来的文件，最终输出的文件。
- chunk：是指 webpack 在进行模块的依赖分析的时候，代码分割出来的代码块。（存在内存中，可能由多个模块合成，entry 生成、import()动态加载、splitChunks 拆分代码块）
- module：是开发中的单个模块，各个源码文件。

## webpack 如何抽离公共代码？:star2: TODO
通过 splitChunks 分组

## webpack 如何实现动态加载？
webpack 默认支持动态加载。需要异步加载的内容只需要使用以下语法即可。（和 Vue 异步组件、Vue-Router 异步加载路由引入方式相同）
```javascript
// 打包后会默认产出一个 chunk
import('./xxx').then(res => {
  console.log(res)
})
```

## webpack 的构建流程？

## webpack 的热更新是如何实现的？

## webpack 如何优化前端性能？:star2:

## 如何提高 webpack 的构建速度？:star2:
- 生产环境：
	- 优化 babel-loader：
  	- 开启缓存：cacheDirectory
  	- 明确范围：include、exclude
  - IgnorePlugin：忽略第三方包指定目录，避免某些模块引入
  - noParse：过滤不需要解析的文件
  - happyPack：开启多进程打包（new HappyPack 实例）
  - ParallelUglifyPlugin：多进程压缩 JS
- 开发环境：
	- 自动刷新：通过 webpack-dev-server 开启服务时会默认开启（整个网页全部刷新，速度较慢）
	- 热更新：通过 HotModuleReplacementPlugin 配置。
	- DllPlugin + DllReferencePlugin：拆分 bundle，提升构建速度
		- DllPlugin：打包出 dll 文件
		- DllReferencePlugin：使用 dll 文件，配置 dll 文件映射地址

## 自动刷新和热更新的区别？
- 自动刷新：
	- 整个网页全部刷新，速度较慢。
	- 页面刷新后状态会丢失（输入框内容会清空）
	- 涉及到发送请求获取数据，需要重新获取。
- 热更新：
	- 新代码直接生效，网页不会刷新
	- 状态不会丢失
	- 不会重新获取数据

## 什么时候开启多进程打包？
- 项目较大，打包较慢，开启多进程能提高速度。
- 项目较小，打包很多，开启多进程的时候会降低速度（进程之前需要通信）

## webpack 如何优化产出代码？:star2:
- 原则：
	- 打包出代码体积更小
	- 合理分包，不重复加载
	- 打包后代码执行速度更快，内存使用更少
- 方式：
	- 小图片 base64编码
	- bundle 加 hash（通过 contenthash 配置，内容不改变不重新打包，上线可以命中缓存）
	- 懒加载
	- splitChunks 提取公共代码
	- IgnorePlugin 打包后的代码会更少
	- Scope Hoisting（引入 ModuleConcatenationPlugin）
		- 代码体积更小
		- 创建函数作用域更少
		- 压缩后的代码可读性好一点
	- mode 值为 production
		- 自动开启代码压缩功能
		- Vue 会自动删除调试代码，体积更小
		- mode 为 production 是默认开启 tree-Shaking（ES6 Module 生效，CommonJS 不生效）

## 为什么 ES6Module 生效、CommonJS 不生效？
- ES6Module 是静态引入，编译时就引入
- CommonJS 是动态引入，执行时引入
- 只有 ES6Module 才是静态分析，实现 Tree-Shaking

## 单页面应用的配置？

## 多页面应用的配置？

## babel 和 webpack 的区别？
- babel 是新语法编译工具，不关心模块化。
- webpack 是打包构建工具，是配置 loader 和 plugin 的集合。

## 如何产出一个 lib？
output 的时候配置 library
```
output: {
	// lib 文件名
  filename: 'xxx.js',
  // 输出 lib 到 dist 目录下
  path: 'dist',
  // lib 的全局变量名
  library: 'xxx'
}
```

## 为什么 Proxy 不能被 Polyfill？
如 Class 可以用 function 模拟；Promise 可以用 callback 模拟。      
但是Proxy 的功能用现成的语法无法模拟（Object.defineProperty 也不能完全模拟）