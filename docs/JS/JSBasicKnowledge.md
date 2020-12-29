# JS 其他零散知识
## 什么是 JSON？
- JSON 是一种数据格式，本质是一段字符串。
- JSON 格式和 JS 对象结构一致，对 JS 语言更友好。
- window.JSON 是一个全局对象
- 常用方法： 
	- JSON.stringify：对象转为字符串
	- JSON.parse：字符串转为对象

## 如何在 JavaScript 中实现不可变对象？:star2:
定义：对象在创建之后就不可改变称为不可变对象。    
我们可以使用 Object.freeze() 是对象的原始属性不可改变。
```javascript
const obj = {
  num: 1,
  innerObj: {
    name: 'lml'
  } 
};
Object.freeze(obj);
obj.num = 2;
obj.innerObj.name = 'xxs';
console.log(obj); // 我们会发现 num 没有被改变，但是 innerObj.name 被改变了。
```
综上所述：我们可以看出对象中的属性我们不能修改，但是对象中的嵌套对象是可以更改的。     
这个时候我们就需要使用递归，来对每一个对象实现不可变。
```javascript
function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const value = obj[name];
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj) 
}
const obj = {
  num: 1,
  innerObj: {
    name: 'lml'
  } 
};

deepFreeze(obj);
obj.num = 2;
obj.innerObj.name = 'xxs';
console.log(obj); // 这时候我们发现嵌套对象也不可改变了。
```

## 函数柯里化是什么？:star2:
定义：在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。    
作用：函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。
```javascript
const curry = fn => {
  if (typeof fn !== "function") {
    throw Error("No function provided");
  }
  return function curriedFn(...args) {
    if (args.length < fn.length) {
      return function() {
        return curriedFn.apply(null, args.concat([].slice.call(arguments)));
      };
    }
    return fn.apply(null, args);
  };
};
```

## 函数节流和函数防抖是什么？:star2:
防抖与节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。
- 函数节流：
	- 定义：在指定的时间间隔内只会执行一次任务。
	- 应用：适合大量事件按时间平均触发（如：DOM 元素拖拽、滚动条事件等）
- 函数防抖：
	- 定义：任务频繁触发的情况下，只有任务触发的时间间隔超过指定间隔的时候，任务才会执行。
	- 应用：适合多次事件一次响应。（如：适合防止表单多次提交、输入框连续输入等）
```javascript
// 节流
function throttle(fn, interval = 500) {
  let timer = null;
  return (...args) => {
    if (timer) return false;
    fn.apply(this, args);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, interval);
  };
}
// 防抖
function debounce(fn, interval = 500) {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}
```

## 什么是深度优先遍历和广度优先遍历？

## Symbol 是什么？
- 定义：Symbol 是 ES6中新的原始数据类型，表示独一无二的值。
- 注意事项：
	- Symbol 不能使用 new 运算符，会报错。
	- Symbol 和任何值都不相等，除非使用 Symbol.for() 声明变量。
	- Symbol 不能与其他类型进行计算。
	- Symbol 作为属性名，不会被遍历，但是可以通过 Object.getOwnPropertySymbols 方法获取指定对象的所有 Symbol 属性名。

## ES6Module 和 CommonJS 模块的异同点？:star2:
- 模块化的作用：提高了项目的可维护、可拓展和可协作性。   
- 使用场景：我们在浏览器中使用 ES6 的模块化支持，在 Node 中使用 CommonJS 的模块化支持。（webpack 中的 Tree-Shaking 只有 ES6Module 支持）
- 区别： 

|   区别点  | ES6Module 形式 |  CommonJS  |
|:-------------:|:-------------:|:----------------------:|
| 使用   | import / export | require / module.exports / exports |
| 是否支持动态引入  | 不支持 (babel 下可支持) | 支持 |
| 同/异步   | 异步 | 同步 |
| 导入方式  | 是值拷贝，导出值变化不会影响导入值 | import指向 内存地址，导入值会随导出值而变化 |

## Set、Map、WeakSet、WeakMap 之间区别？:star2:
- Set：类似于数组，成员的值是唯一的，但不是数组，是一种特殊的对象。
	- Set 中对于值的比较是使用===进行判断的，但是 NaN 只能有一个。
	- Set.prototype.size：返回实例成员总数。
	- add(value)：添加某个值，返回 Set 本身。
	- delete(value)：删除某个值，返回布尔类型。
	- has(value)：表示参数是否为 Set 的成员，返回布尔类型。
	- clear()：清除所有成员，没有返回值。
	- 可以使用 forEach() 进行遍历。
- WeakSet：WeakSet 结构与 Set 类似，也是不重复的值的集合。
	- 与 Set 不同点1：成员只能是对象，不能是其他类型的值。
	- 与 Set 不同点2：WeakSet 中对象都是弱引用，所以不能遍历。
	- 只有 add、delete、has 方法，没有 size、clear。
- Map：类似于对象，但是 key 值不局限于字符串，可以是各种类型的值。
	- Map.Prototype.size：返回 Map 结构的成员总数。
	- set(key, value)：设置 key 对应的键值，然后返回整个 Map 结构。
	- get(key)：读取 key 对应的键值，如果找不到 key 则返回 undefined。
	- has(key)：返回一个布尔值，表示某个键是否在 Map 数据结构中。
	- delete(key)：删除某个键，返回 true，删除失败则返回false。
	- clear()：清除所有成员，没有返回值。
	- 可以使用 forEach、keys、values、entries 进行遍历。
- WeakMap：WeakMap 机构与 Map 类似，也用于生成键值对的集合。
	- 与 Map 不同点1：WeakMap 只接受对象作为键名，不接受其他类型值作为键名。
	- 与 Map 不同点2：WeakMap 的键名所指的对象不计入垃圾回收机制。
	- 只有 set、get、has、delete方法，没有 size、clear。
	- 不能进行遍历操作。

## 你对 Proxy 的理解？
- 定义：用于修改某些操作的默认行为，等同于在语言层面作出修改。（实际就是代理，对外界的访问进行过滤和改写）
- 使用：let proxy = new Proxy(target, handler)
- 实例的方法：
	- get()：用于拦截某个属性的读取操作。
	- set()：用于拦截某个属性的赋值操作。
	- apply()：用于拦截函数的调用、call 和 apply 操作。
	- has()：用于拦截 HasProperty 操作，即判断对象是否有某个属性，这个方法会生效。
	- construct()：用于拦截 new 命令。
	- deleteProperty()：用于拦截 delete 操作，如果这方法返回 false 或者抛出错误，当前属性就无法被删除。
	- defineProperty()：用于拦截 Object.defineProperty 操作。
	- getOwnPropertyDescriptor()：用于拦截 Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者 undefined。
	- getPrototypeOf()：用于拦截获取对象原型，具体如下：
		- Object.prototype.\_\_proto\_\_
		- Object.prototype.isPrototypeOf()
		- Object.getPrototypeOf()
		- Reflect.getPrototypeOf()
	- isExtensible()：用于拦截 Object.isExtensible 操作，只能返回布尔值。
	- ownKeys()：用于拦截对象自身属性的读取操作，具体如下：
		- Object.getOwnPropertyNames()
		- Object.getOwnPropertySymbols()
		- Object.keys()
	- preventExtensions()：用于拦截 Object.preventExtensions()。
	- setPrototypeOf()：用于拦截 Object.setPrototypeOf 方法。

## 你对 Reflect 的理解？
- 定义：Reflect 与 Proxy 一样，也是 ES6为了操作对象而提供的新 API。
- 目的：
	- 将 Object 对象的一些明显的语言内部的方法放到 Reflect 对象上。
	- 修改某些 Object 方法的返回结果，让其变得更合理。
	- 让 Object 操作都变成函数行为。
	- Reflect 对象的方法与 Proxy 对象的方法一一对应，使 Proxy 对象可以方便的调用 Reflect 方法完成默认行为。（无论 Proxy 怎么修改默认行为，我们总可以在 Reflect 上获取默认行为）
- 实例的方法：
	- get(target, name, receiver)：查找并返回 target 对象的 name 属性，如果没有该属性则返回 undefined。
	- set(target, name, value, receiver)：设置 target 对象的 name 属性等于 value。
	- apply(func, thisArg, args)：等同于 Function.prototype.apply.call(func, thisArg, args），用于绑定 this 对象后执行给定函数。
	- has(obj, name)：对应 name in obj 中的 in 运算符。
	- construct(target, args)：等同于 new target(...args)，提供了一种不使用 new 来调用构造函数的方法。
	- deleteProperty(obj, name)：对应 delete obj\[name\]，用于删除对象的属性。
	- defineProperty(target, propertyKey, attributes)：等同于 Object.defineProperty，用来为对象定义属性。
	- getOwnPropertyDescriptor(target, propertyKey)：等同于 Object.getOwnPropertyDescriptor，用来获取指定属性的描述对象。
	- getPrototypeOf(obj)：用于读取对象的 \_\_proto\_\_ 属性，对应 Object.getPrototypeOf(obj)。
	- isExtensible(target)：对应 Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
	- ownKeys(target)：用于返回对象的所有属性，基本等同于 Object.getOwnPropertyNames 与 Object.getOwnPropertySymbols 之和。
	- perventExtensions(target)：对应 Object.preventExtensions 方法，用于使一个对象变为不可扩展的。
	- setPrototypeOf(obj, newProto)：用于设置对象的 \_\_proto\_\_ 属性，返回第一个参数对象，对应 Object.setPrototypeOf(obj, newProto)。

## babel 编译原理？
- babylon 将 ES6及其以上版本的代码解析成 AST 树。
- babel-traverse 将 AST 树进行遍历，得到新的 AST 树。
- 新 AST 树通过 babel-generator 转换为 ES5 语法。

## babel 环境搭建和基本配置
- .babelrc：此文件用于配置转码规则和插件。
- @babel/preset-env：满足大多数的 ES6+ 语法，是很多 babel-plugin 的集合。
- babel-polyfill：满足大多数新 API（已经被弃用）
	- babel-polyfill 是 core-js 和 regenerator 的集合。
	- 推荐直接使用 core-js 和 regenerator。
	- 只处理新的 API，不处理模块化，需要 webpack 处理。
	- 文件较大，需要按需引入。
	- 会污染全局环境，将不支持的语法挂载到 window 上。
- babel-runtime：因为直接使用 babel-polyfill 会污染全局，使用 babel-runtime 可以更改要挂载的全局变量名称，不会污染全局。
```
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "ie": "8"
      },
      // babel-polyfill 按需引入
      "useBuiltIns": "usage"
    }]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-modules-commonjs",
      {
        "allowTopLevelThis": true
      }
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ],
    // @babel/preset-env 中没有的 babel-plugin
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings"
  ]
}
``` 

## AST 树是什么？
- 定义：AST 树的全称为抽象语法树，是将代码逐字母解析成树状对象的形式。
- 作用：语言之间的代码转换、代码语法检查、代码风格检查、代码格式化、代码自动补全等功能的基础。

## 谈谈对面向对象的理解？:star2:
- 定义：把不同的事务分解成一个个对象，然后由对象之间分工合作。
- 核心：面向对象的两个核心就是类和对象。
	- 类：对具有相同属性和方法的对象的抽离。
	- 对象：一组无序的相关属性和方法的集合。
	- 两者关系：类的实例就是对象，可以理解为类为模具，对象是根据模具创造的产品。
- 特点：面向对象的特点为继承性、多态性、封装性。
	- 继承：子类继承父类，子类与父类表现的很像，当然子类可以具有自己的属性和方法。
	- 多态：子类重写父类，继承同一个父类的子类，对同一属性和方法表现的不同。
	- 封装：内部实现细节对外部隐藏，使用属性描述符（private、public、protected）来控制成员的访问。
- 继承的实现：class、构造函数式继承、原型链继承、组合式继承、寄生组合式继承。
- 为什么使用面向对象：降低程序之间的耦合，提升代码的复用性、灵活性和可扩展性。

## 观察者模式 VS 发布-订阅模式？
观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知
- 观察者模式就好像 个体奶农和个人的关系。奶农负责统计有多少人订了产品，所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法。
- 发布-订阅模式就好像报社， 邮局和个人的关系，报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。
![观察者模式vs发布订阅模式](/image/observer.png)

