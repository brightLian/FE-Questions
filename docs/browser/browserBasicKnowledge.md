# 浏览器相关
## 从输入一个 URL 到展示到过程？:star2:
- 浏览器先根据访问的网址读取缓存。
	- 从浏览器缓存、系统缓存、路由器缓存进行读取，有则直接渲染页面
- 浏览器通过网址进行域名解析，查找到对应的 ip 地址。
	- 先查看本地 host 文件是否有和这个网址的对应关系，有则直接用此 ip 地址
	- 本地文件没有则向本地 DNS 服务器发送请求，一层一层查找后返回 ip 地址
	- 在这个步骤的时候会先判断是否存在 DNS 缓存
- 浏览器和服务器建立 TCP 连接。
	- TCP 连接的建立需要进行三次握手
- 浏览器根据 ip 地址向服务器发起 http 请求。
	- 在发起请求之前先判断强缓存是否过期，未过期直接使用，不发起请求
- 服务器处理请求，返回相关信息给浏览器。
	- 服务器接受请求后，先判断资源是否被重定向
	- 再判断请求中的信息是否命中协商缓存
	- 命中协商缓存后返回304状态码，没有命中则返回新的资源信息以及缓存标识
- 浏览器收到资源后，解析资源并渲染页面。
	- 浏览器渲染页面需要多个步骤
- 浏览器和服务器断开 TCP 连接。
	- TCP 连接的断开需要进行四次挥手

## 浏览器的渲染过程？:star2:
- 关键路径：
	- 解析器根据 HTML 生成 DOM 树
	- 解析器根据 CSS 生成 CSS 树
	- 将 DOM 树和 CSS 树融合，生成 render 渲染树
	- 根据渲染树开始进行页面的布局，计算每个节点的信息
	- 根据渲染树每个节点绘制到不同的层
	- 不同的层复合形成页面
- 渲染阻塞：浏览器遇到 script 标签后，DOM 构建会暂停，等待脚本完成后继续渲染。

## window.onload 和 DOMContentLoaded 到区别？
- window.onload 事件在页面全部资源加载完成才会执行，包括图片、视频等。
- DOMContentLoaded 在 DOM 渲染完即可执行，此时图片、视频还可能没加载完。（也称 document ready 时期）

## 什么是同源策略及限制？
- 同源策略：用于限制一个源的文档或者加载的脚本是否可以和另一个源进行交互。
- 同源：协议 + 域名 + 端口都相同的情况下就是同源。
- 限制：当发起请求的源与请求的资源不同时，会出现跨域问题。

## 如何解决跨域问题？:star2:
- 所有的跨域，都必须经过 server 端允许和配合。
- JSONP：
	- 利用动态创建\<script\>不受跨域的影响，但是只能进行 GET 请求
	- 服务器可以任意动态拼接数据返回
- CORS：
	- 利用 Access-Control-Allow-xxx 设置允许跨域的域名、方法等
	- 需要服务端设置 http header
- Server Proxy：
	- 原理是服务器之间的请求是不存在跨域问题的
	- 利用 Nginx 的反向代理功能可以实现
	- 客户端先请求不跨域的域名 aaa.com，然后 Nginx 作为服务器反向代理转发给 bbb.com

## CORS 解决跨域时如何处理 cookie？
跨域如果需要携带 cookie 时，需要前后端两方同时处理。
- 服务端：设置相应的 header。
	- Access-Control-Allow-Credentials: true
	- Access-Control-Allow-Origin: "https://xxx.com"
	- Access-Control-Allow-Methods: *
	- Access-Control-Allow-Headers: \["Content-Type", "Authorization", "Accept"\]
- 前端需要在请求时设置
	- xhr.withCredentials = true;
	- 同时服务端的 Access-Control-Allow-Origin 不能设置为 *

## JSONP 原理？为什么不是真正的 ajax？
- 原理：静态资源请求不受同源策略限制。通过动态创建 script 标签，基于回调函数。但是只能发送 GET 请求。
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
