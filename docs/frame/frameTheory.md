# 前端框架原理
## MVC 是什么？
- 分为3部分：
	- M 为 Model，用于数据保存
	- V 为 View，用于用户页面展示
	- C 为 Controller，用于业务逻辑
- 各部分之间的通信方式：
	- View 传送指令到 Controller
	- Controller 完成业务逻辑后，要求 Model 更改数据
	- Model 将数据发送到 View 用户得到反馈
	- 所有通信之间都是单向的
![MVC](/image/MVC.png)

## MVP 是什么？
- 分为3部分：
	- M 为 Model，用于数据保存
	- V 为 View，用于用户页面展示
	- P 为 Presenter，用于控制逻辑
- 各部分之间的通信方式：
	- 各部分之间的通信都是双向的
	- View 与 Model 不发生联系，都通过 Presenter 传递
	- View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里
![MVP](/image/MVP.png)

## MVVM 是什么？
- 分为3部分：
	- M 为 Model，用于数据保存
  - V 为 View，用于用户页面展示
  - VM 为 ViewModel，用于控制逻辑
- 各部分之间的通信方式：
	- MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致
	- 唯一的区别是，它采用双向绑定：View的变动，自动反映在 ViewModel，反之亦然
![MVVM2](/image/MVVM2.png)

## 小程序和 H5 有什么区别？:star2:
- 渲染方式与 H5 不同，小程序一般是通过 Native 原生渲染的，但是小程序同时也支持 web 渲染，如果使用 web 渲染的方式，我们需要初始化一个 WebView 组件，然后在 WebView 中加载 H5 页面。
- 小程序特有的双线程设计。
	- H5 下我们所有资源通常都会打到一个 bundle.js 文件里（不考虑分包加载）。
	- 而小程序编译后的结果会有两个bundle，index.js封装的是小程序项目的 view 层，以及 index.worker.js 封装的是项目的业务逻辑。
	- 在运行时，会有两条线程来分别处理这两个bundle，一个是主渲染线程，它负责加载并渲染 index.js 里的内容；
	- 另外一个是 Service Worker线 程，它负责执行 index.worker.js 里封装的业务逻辑，这里面会有很多对底层api调用。
