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
