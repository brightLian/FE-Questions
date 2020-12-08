# node 相关
## node 事件循环？

## 什么是线程，什么是进程？
- 浏览器和 node 已经支持 JS 启动进程，如 Web Worker。
- JS 和 DOM 渲染公用同一个线程，因为 JS 可以修改 DOM 结构。

## pm2相关学习

## cluster 模块使用

## child_process 模块使用

## npm 模块安装原理
- 发出 npm install 命令
- 查询 node_modules 目录之中是否已经存在指定模块
	- 若存在，不再重新安装
  - 若不存在
		- npm 向 registry 查询模块压缩包的网址
		- 下载压缩包，存放在根目录下的.npm目录里
		- 解压压缩包到当前项目的node_modules目录