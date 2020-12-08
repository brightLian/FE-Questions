# 缓存相关
## 什么是缓存，缓存的作用是什么？
- 定义：把一些不需要重新获取的内容不再重新获取。
- 作用：减少网络请求，处理更快。
- 哪些可以缓存：静态资源文件（CSS、JS、Img）。

## HTTP 的缓存过程是什么样的？:star2:
- 初次请求时：
	- 客户端初次请求到服务器
	- 服务器返回资源和缓存规则
	- 客户端将资源和缓存规则存入到本地
- 再次请求时：
	- 先校验强缓存是否生效（不需要发送请求）
	- 再校验协商缓存是否生效（需要发送请求验证）
	- 强缓存的优先级高于协商缓存、当强缓存生效时则不使用协商缓存
- 缓存过期时：
	- 重新请求资源，并重新设置缓存标识

## 强缓存是什么？:star2:
- 客户端缓存策略的一种。
	- 浏览器在加载资源时，先根据这个资源的一些 http header 判断它是否命中强缓存，强缓存如果命中，浏览器直接从自己的缓存中读取资源，不会发请求到服务器。
- 标识：在 Response Header 中，有两种类型。
	- Cache-Control：有很多属性，不同的属性代表的意义也不同
		- private：客户端可以缓存
    - public：客户端和代理服务器都可以缓存
		- max-age=t：缓存内容将在 t 秒后失效
		- no-cache：需要使用协商缓存来验证缓存数据
		- no-store：所有内容都不会缓存
	- Expires：值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。
	- Cache-Control 的 max-age 优先级高于 Expires，因为 Expires 使用的是绝对时间，如果服务端和客户端的时间产生偏差，那么会导致命中缓存产生偏差。

## 协商缓存是什么？:star2:
- 服务器端缓存策略的一种。
	- 服务器判断客户端资源是否和服务端一致，一致则返回304，否则返回200、最新资源和最新资源标识。
- 过程：分为初次请求和再次请求。
	- 客户端初次请求到服务器，服务器返回资源和资源标识。
	- 客户端再次请求，带着资源标识，一致则返回304，客户端直接从缓存读取资源。
	- 不一致则返回200、最新资源和最新资源标识。
- 资源标识：在 Response Header 中，有两种类型。
	- Last-Modified：资源的最后修改时间。
	- Etag：当前资源在服务器的唯一标识（不能重复）。
	- 两种同时存在时会优先使用 Etag，因为 Last-Modified 只能精确到秒。

## 三种刷新操作对强制缓存和协商缓存的影响？
- 正常操作：地址栏输入 url、跳转链接、前进后退等。
	- 强制缓存有效
	- 协商缓存有效
- 手动刷新：F5、点击刷新按钮、右击菜单刷新。
	- 强制缓存失效
	- 协商缓存有效
- 强制刷新：ctrl + F5、shift + command + R。
	- 强制缓存失效
	- 协商缓存失效