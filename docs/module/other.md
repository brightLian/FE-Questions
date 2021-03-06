# 其他零散问题
## 怎样理解前端工程化？


## 前端为何要进行打包和构建？
- 代码层面：
	- 体积更小（tree-Shaking、压缩、合并），加载更快。
	- 编译高级语言和语法（ES6+、SCSS、TS 等）。
	- 兼容性和错误检查（postcss、eslint）。
- 开发流程层面：
	- 给出统一高效的开发环境。
	- 给出统一的构建流程和产出标准。

## Charles 使用过程及其问题？
- 使用过程：
	- 手机和电脑同时链接一个局域网
	- 将手机代理到电脑上
	- 手机浏览网页，即可以实现抓包
	- 查看网络请求
- 使用网址代理：
	- 使用 tool -\> mapRemoteSettings 进行代理 
- https
	- 使用 proxy -\> sslProxyingSettings 进行

## 为什么会出现混合开发？
- web 开发远比 iOS 和 android 更加方便和高效。
- web 框架远比 iOS 和 android 的各种库和框架方便。
- web 预览远比 iOS 和 android 的预览高效，客户端需要编译。

## 混合开发的方式？
- JSBridge：JSBridge 提供了 Native 和 JS 之间的通信桥梁。
- 原生UI：React Native/Weex 利用 JS 引擎来调用 Native 端组件，从而实现相应的功能。
- 自绘引擎：不依赖操作系统提供的布局、原生组件的能力，直接调用 GPU 或者底层抽象层进行绘制的渲染引擎，比如 Flutter。

## JSBridge 原理是什么？
- 定义：JSBridge 是一种 JS 实现的 Bridge，连接着桥两端的 Native 和 H5。
- 作用：JSBridge 主要提供了 JS 调用 Native 代码的能力，实现原生功能如查看本地相册、打开摄像头、指纹支付等，同时也提供了 Native 调用 JS 的能力。
- JSBridge 的双向通信原理实现：
	- 拦截 URL Scheme：Web 端通过某种方式（例如 location.href）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。
	- 注入 API：通过 WebView 提供的接口，向 JavaScript 的 Context（window）中注入对象或者方法。让 JavaScript 调用时，直接执行相应的 Native 代码逻辑，达到 JavaScript 调用 Native 的目的。
	- Native callback 实现：当发送 JSONP 请求时，url 参数里会有 callback 参数，其值是当前页面唯一的，而同时以此参数值为 key 将回调函数存到 window 上。随后，服务器返回 script 中，也会以此参数值作为句柄，调用相应的回调函数。

## Babel 的原理？
- 定义：Babel 是一个 JavaScript 编译器，主要用于将 ES5+ 版本的代码转换为向后兼容的 JavaScript。
- babel的运行原理
	- 解析：进行词法分析和语法分析，将代码转换为 AST 语法树。
	- 转换：将 AST 树进行深度遍历，得到新的 AST 树。
	- 编译：新 AST 树通过编译后转换为 ES5 语法。