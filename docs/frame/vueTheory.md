# Vue 原理

## 如何理解 MVVM 模型？
- MVVM 模型分为了三层：视图层(V-View 层)、数据层（M-Model 层）、数据视图层（VM-ViewModel 层）     
	- 数据层：泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。
  - 视图层：也就是用户界面。前端主要由 HTML 和 CSS 来构建。
  - 数据视图层：前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。 
- 其中最重要的是数据视图层，其中的核心概念就是数据驱动视图。 ————
MVVM 框架实现了双向绑定，这样 ViewModel 的内容会实时展现在 View 层。
我们再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了。
我们只需要处理和维护 ViewModel，当组件数据变化时，视图就会得到相应更新。
这样 View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层。
这个解耦是至关重要的，它是前后端分离方案实施的重要一环。
![MVVM](/image/mvvm.png)

## 双向数据绑定原理？
- input 元素的 value = this.name；
- 绑定 input 事件 this.name = $event.target.value；
- data 触发重新渲染

## Vue 响应式的实现原理？:star2:
- vue3.0 之前的版本：
	- 实现：数据响应的实现由两部分构成: 观察者( watcher ) 和 依赖收集器( Dep )，其核心是 defineProperty 这个方法，它可以重写属性的 get 与 set 方法，从而完成监听数据的改变。
	- 深度监听：通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。
	- 优点：
		- 兼容性好，支持 IE9 版本浏览器。
	- 缺点：
		- 深度监听时需要递归到底，一次性计算量大。
		- 无法监听新增、删除属性。（给 data 赋值时需使用 Vue.set 和 Vue.delete）
		- 无法原生监听数组，需要特殊处理。（数组监听需要重新定义数组原型，重写 push、pop等方法来实现）  
- vue3.0 之后的版本：
	- 实现：通过 proxy 实现。
	- 优点：
		- 深度监听时不需要递归到底，而在使用时才会递归。
		- 可以直接深度监听对象和数组。
		- 拦截方式多，可以直接监听 data 属性的新增、删除。
	- 缺点：
		- 兼容性不好，且无法 polyfill。
```javascript
// 使用 Object.defineProperty 实现简单的数据监听。
const data = {};
let name = 'lml';
Object.defineProperty(data, 'name', {
  get() {
    console.log('get');
    return name
  },
  set(v) {
    console.log('set');
    if (name === v) {
      name = v
      // updateView() 触发视图更新
    }
  }
});
console.log(data.name);
data.name = 'xxs';
```
```javascript
// 对数组的某些方法监听，实现视图更新。
const oldArrayProperty = Array.prototype;
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName = 
	arrProto[methodName] = function() {
	  oldArrayProperty[methodName].call(this, ...arguments);
	  // updateView() 触发视图更新
	}
)
```

## nextTick 的实现原理？

## virtual dom 原理实现？:star2:
- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象。
- diff 算法： 比较两棵虚拟 DOM 树的差异。
- patch 算法：将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。

## 如何用 JS 模拟 DOM 结构？
```html
<div id="id1" class="container">
	<p>vdom</p>
	<ul class="ul" style="font-size: 20px">
		<li>a</li>
	</ul>
</div>
```
```json
{
  "tag": "div",
  "props": {
  	"id": "id1",
    "className": "container"
  },
  "children": [
  	{
  		"tag": "p",
  		"children": "vdom"
  	},
  	{
  		"tag": "ul",
  		"props": {
  			"className": "ul",
  			"style": "font-size: 20px"
  		},
  		"children": {
  			"tag": "li",
        "children": "a"
  		}
  	}
  ]
}
```

## diff 算法是什么？:star2:
diff 算法实际是对两个 DOM 树进行比较，如果完全比较时间复杂度为 O(n^3)。
但是在前端中，很少出现越级移动 DOM 元素，所以 虚拟 DOM 都 diff 算法只会对同一个层级进行对比，时间复杂度为 O(n)。
- 核心：
	- 同层比较，不跨级比较。
	- tagName 不相同，则直接删掉重建，不再深度比较
	- tagName 和 key 两者都相同，则认为节点相同，不再深度比较。

## patch 算法是什么？:star2:
patch 算法实际是通过对新老 VNode 树进行对比，根据比较结果进行最小单位的修改视图。
- 核心：
	updateChildren：这个也是 diff-patch 算法的核心。主要通过 while 循环去对比2棵树的子节点来更新 dom，通过对比新的来改变旧的，以达到新旧统一的目的。

## 列表组件中写 key，其作用是什么？:star2:
diff 算法中通过 tagName 和 key 来判断 DOM 节点是否相同。减少组件的渲染次数，提升渲染性能。
- 更准确：因为带 key 就不是就地复用了，在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确。
- 更快：利用 key 的唯一性生成 map 对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)

## 模板编译是什么？
Vue 是通过 vue-template-compiler 进行模版编译的。
- 定义：模板转换为 JS 代码，叫做模板编译。
- 过程：
	- 模板编译为 render 函数，执行 render 函数返回 vnode。
	- 基于 vnode 再执行 patch 和 diff。
	- 使用 webpack 和 vue-loader，在开发环境进行编译。

## Vue 组件是如何渲染和更新的？
- 初次渲染过程：
	- 解析模板为 render 函数
	- 触发响应式，监听 data 属性
	- 执行 render 函数，生成 vnode，patch 创建新节点
- 更新过程：
	- 修改 data，触发 setter
	- 重新执行 render 函数，生成 newVnode
	- 重新 patch(vnode, newVnode)

## Vue 组件是异步渲染还是同步渲染？
是异步渲染的，Vue 的组件会汇总 data 的修改，一次性修改视图，减少 DOM 操作提升性能。

## Vue3.0 的特性有哪些？:star2:
- 全部用 TS 重写。
- 性能提升，打包后代码量却减少了。
```javascript
// proxy 实现数据监听
const data = {
  name: 'lml',
  age: '24'
};
// const data = ['a', 'b', 'c'];
const proxyData = new Proxy(data, {
  get(target, p, receiver) {
    const onwKeys = Reflect.ownKeys(target);
    if (onwKeys.includes(keys)) {
      console.log('get', p);
    } 
    const result = Reflect.get(target, p, receiver);
    return result // 在这里做深度监听。
  },
  set(target, p, value, receiver) {
    const result = Reflect.set(target, p, value, receiver);
    console.log('set', p, value, result);
    return result
  },
  deleteProperty(target, p) {
    const result = Reflect.deleteProperty(target, p);
    console.log('delete', p, result);
    return result
  }
});
console.log(proxyData.name);
proxyData.age = 25;
proxyData.job = 'tec';
delete proxyData.job;
// console.log(proxyData[0]);
// proxyData[3] = 'd';
// delete proxyData[2];
```
