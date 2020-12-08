# 浏览器相关
## 从输入一个 URL 到展示到过程？:star2:
- DNS 通过网址解析成 ip 地址。
	- 在这个步骤的时候会先判断是否存在 DNS 缓存。
- TCP 连接（三次握手）
- 浏览器根据 ip 地址向服务器发起 http 请求
	- 在向服务端发起请求之前先判断强缓存是否存在。
- 服务器处理请求，并返回给浏览器
	- 服务器接受请求后，先判断资源是否被重定向。
	- 再判断请求中的信息是否命中协商缓存。
	- 命中后返回304状态码，没有命中则返回资源信息。
- 浏览器解析并渲染页面
- TCP 断开（四次挥手）

## 浏览器的渲染过程？:star2:
- 关键路径：
	- 解析器根据 HTML 生成 DOM 树
	- 解析器根据 CSS 生成 CSS 树
	- 将 DOM 树和 CSS 树融合，生成渲染树
	- 根据渲染树开始进行页面的布局，计算每个节点的信息
	- 根据渲染树每个节点绘制页面
- 渲染阻塞：浏览器遇到 script 标签后，DOM 构建会暂停，等待脚本完成后继续渲染。

## window.onload 和 DOMContentLoaded 到区别？
- window.onload 事件在页面全部资源加载完成才会执行，包括图片、视频等。
- DOMContentLoaded 在 DOM 渲染完即可执行，此时图片、视频还可能没加载完。（也称 document ready 时期）

## 什么是同源策略及限制？
- 同源策略：ajax 请求时，浏览器要求当前网页和 server 必须同源。
- 同源：协议 + 域名 + 端口都相同的情况下就是同源。
- 限制：当发起请求的源与请求的资源不同时，会出现跨域问题。

## 如何解决跨域问题？:star2:
- 所有的跨域，都必须经过 server 端允许和配合。
- JSONP：
	- 利用\<script\>可以绕过跨域，但是只能进行 GET 请求
	- 服务器可以任意动态拼接数据返回
- CORS：
	- 利用 Access-Control-xxx-xxx 设置允许跨域的域名、方法等
	- 需要服务端设置 http header
- Proxy：
	- 利用 Nginx 的反向代理功能 
	- 客户端先请求不跨域等域名 aaa.com，然后 Nginx 作为服务器反向代理转发给 bbb.com

## JSONP 原理？为什么不是真正的 ajax？:star2:
- 原理：动态创建 script 标签，基于回调函数。但是只能发送 GET 请求。
- 为什么不是 ajax：
	- ajax 的核心是通过 XMLHttpRequest 获取非本页内容。
	- JSONP 的核心则是动态添加 script 标签来调用服务器提供的 js 脚本。
```javascript
function jsonp(url, jsonpCallback, success) {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javascript';
  window[jsonpCallback] = function(data) {
    success && success(data)
  };
  document.body.appendChild(script)
}
```

## 前端即时通讯如何实现？
- 短轮询：客户端通过发送请求每个一段时间发送请求到服务器，服务端返回最新数据。（造成服务器压力大）
- 长轮询：客户端发送一个请求到服务器，服务器数据出现新的数据则再返回响应。
- webSocket：服务端和客户端之间建立实时的双向通信。
- SSE：服务端推送，允许服务单向客户端发送新数据。

## web worker 是什么？
- 定义：现代浏览器为 JavaScript 创造多线程环境的方式。
- 功能：可以新建并将部分任务分配到 worker 线程并行。两个线程可独立运行，互补干扰，不能直接通信但可通过自带的消息机制完成。
- 限制：存在同源限制、无法使用 document / window / alert / confirm、无法加载本地资源。