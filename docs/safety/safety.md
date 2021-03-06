# 安全相关
## 前端常见的安全问题？:star2:
- XSS 跨站脚本攻击：是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式。
- CSRF 跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

## XSS 攻击分类？:star2:
- 存储型：这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等。
	- 攻击者将恶意代码提交到目标网站的数据库中。
	- 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器。
	- 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
	- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
- 反射型：常见于通过 URL 传递参数的功能，如网站搜索、跳转等。
	- 攻击者构造出特殊的 URL，其中包含恶意代码。
	- 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器。
	- 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行。
	- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
- DOM 型：
	- 攻击者构造出特殊的 URL，其中包含恶意代码。
	- 用户打开带有恶意代码的 URL。
	- 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行。
	- 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。
- 区别：
	- 反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。
	- DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。

## 如何预防 XSS 攻击？:star2:
XSS 攻击有两大要素是：攻击者提交恶意代码、浏览器执行恶意代码。
- 预防存储型和反射型 XSS 攻击：
	- 纯前端渲染，把代码和数据分隔开。
	- 服务端直接渲染 HTML 时需要做充分转义。
- 预防 DOM 型 XSS 攻击：
	- 在使用 .innerHTML、.outerHTML、document.write() 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 .textContent、.setAttribute() 等。
  - 如果用 Vue 技术栈，并且不使用 v-html 功能，就在前端 render 阶段避免 innerHTML、outerHTML 的 XSS 隐患。
- 其他预防方式：
	- 对于不受信任的输入，都应该限定一个合理的长度。虽然无法完全防止 XSS 发生，但可以增加 XSS 攻击的难度。
  - HTTP-Only Cookie: 禁止 JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注入后也无法窃取此 Cookie。
  - 使用验证码：防止脚本冒充用户提交危险操作。
 
## CSRF 是什么及攻击方式？:star2:
- 定义：是指攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。
- 流程：
	- 受害者登录a.com，并保留了登录凭证（Cookie）。
	- 攻击者引诱受害者访问了 b.com。
	- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie。
	- a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
	- a.com 以受害者的名义执行了 act=xx。
	- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

## 如何预防 CSRF 攻击？:star2:
CSRF 攻击有两大要素是：攻击发生在第三方域名、CSRF 攻击者不能获取到 Cookie 等信息，只是使用。
- 防御方式：
	- 阻止不明外域的访问进行同源检测。
	- 提交时要求附加本域才能获取的信息：双重 Cookie 验证

## 网络劫持有哪几种？
网络劫持一般分为两种:
- DNS劫持：（输入京东被强制跳转到淘宝这就属于 DNS 劫持）
	- DNS强制解析: 通过修改运营商的本地DNS记录，来引导用户流量到缓存服务器。
  - 302跳转的方式: 通过监控网络出口的流量，分析判断哪些内容是可以进行劫持处理的,再对劫持的内存发起302跳转的回复，引导用户获取内容。
- HTTP劫持：由于 http 明文传输,运营商会修改你的 http 响应内容(即加广告)

## HTTPS 一定是安全的吗？
HTTPS 不一定是安全的，会出现中间人攻击。（Charles 抓 HTTPS 链接就是使用这种方式）
- 过程：
	- 服务器向客户端发送公钥。
  - 攻击者截获公钥，保留在自己手上。
  - 然后攻击者自己生成一个【伪造的】公钥，发给客户端。
  - 客户端收到伪造的公钥后，生成加密hash值发给服务器。
  - 攻击者获得加密 hash 值，用自己的私钥解密获得真秘钥。
  - 同时生成假的加密 hash 值，发给服务器。
  - 服务器用私钥解密获得假秘钥。
  - 服务器用加秘钥加密传输信息
