# JS 手写代码

## 手写节流函数？:star2:
- 定义：在指定的时间间隔内只会执行一次任务。
- 应用：适合大量时间按时间平均触发。（如：DOM 元素拖拽、滚动条时间等）
```javascript
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
```

## 手写防抖函数？:star2:
- 定义：任务频繁触发的情况下，只有任务触发的时间间隔超过指定间隔的时候，任务才会执行。
- 应用：适合多次事件一次响应。（如：适合防止表单多次提交、输入框连续输入等）
```javascript
// 防抖函数
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

## 手写 apply 函数:star2:
- **apply：** 用于在特定的作用域中调用函数，接受两个参数。一个参数是函数运行的作用域，另一个参数是函数的参数数组。
```javascript
Function.prototype.myApply = function() {
  const params = [...arguments]; // 统一获取参数
  const _this = params[0]; // 获取要绑定的作用域
  const args = params[1]; // 获取要指定的参数数组
  _this.fn = this; // 绑定作用域
  return _this.fn(...args) // 执行函数
};
window.x = 1;
let a = {
  x: 2
};
function fn1(num1, num2) {
  console.log(this.x);
  console.log(num1);
  console.log(num2);
}
fn1(1.1, 1.2);
fn1.myApply(a, [2.1, 2.2]);
```

## 手写 call 函数:star2:
- **call：** 用于在特定的作用域中调用函数，接收不定数目参数。第一个参数是函数运行时的作用域，其余参数直接作为函数参数。
```javascript
Function.prototype.myCall = function() {
  const params = [...arguments]; // 统一获取参数
  const _this = params[0]; // 获取要绑定的作用域
  const args = params.slice(1); // 获取要指定的参数数组
  _this.fn = this; // 绑定作用域
  return _this.fn(...args); // 执行函数
};
window.x = 1;
let a = {
  x: 2
};
function fn1(num1, num2) {
  console.log(this.x);
  console.log(num1);
  console.log(num2);
}
fn1(1.1, 1.2);
fn1.myCall(a, 2.1, 2.2);
```

## 手写 bind 函数:star2:
**bind：** 创建一个新的函数，接受不定数目参数，第一个参数作为函数运行时的的作用域，其余参数作为函数参数。需要重新执行新的函数
```javascript
Function.prototype.myBind = function() {
  const params = [...arguments];// 统一获取参数
  const _this = params[0]; // 获取要绑定的作用域
  const args = params.slice(1); // 获取要指定的参数数组
  _this.fn = this; // 绑定作用域
  return function() {
   _this.fn(...args) // 返回函数
  }  
};
// 使用
function fn1(a, b, c) {
  console.log('this', this);
  console.log(a, b, c);
}
const fn2 = fn1.myBind({x: 100}, 1, 2, 3);
fn2();
```

## 闭包的实际应用:star2:
闭包有两种形式：函数作为参数、函数作为返回值。       
并且其中一个比较重要的作用就是保护变量。   
我们据此使用闭包做一个缓存工具，隐藏数据，只提供 API。
```javascript
function createCache() {
  const data = {};
  return {
    set(key, value) {
      data[key] = value;
    },
    get(key) {
      return data[key]
    }
  }
}
// 使用
const cache1 = createCache();
const cache2 = createCache();
cache1.set('a', 1);
console.log(cache1.get('a')); // 1 
console.log(cache2.get('a')); // undefined
```

## 实现不可变数据:star2:
对象在创建之后就不可改变称为不可变对象。    
实现原理：通过 Object.freeze() 来实现，并且需要对对象进行深度递归操作。    
[看下不可变数据原理](../JS/JSBasicKnowledge.html#如何在-javascript-中实现不可变对象)
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
```

## 实现浅拷贝？

## 手写深拷贝？:star2:
- 定义：完全拷贝一个新对象，修改其中一个不会影响另外一个。
- 实现方式：JSON.parse(JSON.stringify(obj))但是引用循环会出现问题、递归方式逐一赋值。
```javascript
// 递归方式
function deepClone(obj = {}) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let result;
  // 现需要类型判断
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    result = [];
  } else {
    result = {};
  }
  for (let key in obj) {
    // 只拷贝自有属性
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]); // 注意深层嵌套情况
    }
  }
  return result;
}
```

## 手写深度比较:star2:
- 定义：对象（包括对象和数组）的比较是指针的比较，深度比较是不对指针进行比较而对对象的属性进行比较，不会考虑函数。
```javascript
const obj1 = {
  a: 100,
  b: {
    b1: 200,
    c1: 200
  }
};
const obj2 = {
  a: 100,
  b: {
    b1: 200,
    c1: 200
  }
};
console.log(obj1 === obj2); // false 因为是对指针的比较，所以 obj1 !== obj2
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
function isEqual(obj1, obj2) {
  // 如果不是对象或者数组，进行值类型的比较
  if (!isObject(obj1) || !isObject(obj2)) {
    return obj1 === obj2
  }
  // 如果是浅拷贝直接返回true
  if (obj1 === obj2) {
    return true
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  // 如果key的数量都不同直接返回false
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  // 循环调用key判断值
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false
    }
  }
  return true
}
console.log(isEqual(obj1, obj2)) // true key-value 相同即可。
```

## 实现 new:star2:
[看下 new 执行过程](../JS/JSPrototype.html#new-运算符的执行过程)
```javascript
function myNew() {
  const args = Array.prototype.slice.call(arguments);
  // 在内存中声明一个对象
  const o = {};
  // 对象的隐式原型链接到构造函数的显示原型
  const thisConstructor = args.shift();
  o.__proto__ = thisConstructor.prototype;
  // 绑定 this
  const result = thisConstructor.apply(o, args);
  // 返回值，考虑 new Object 的情况
  return result instanceof Object ? result : o;
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const per1 = myNew(Person, 'lml', '24');
const per2 = new Person('xxs', '25');
const per3 = myNew(Object, {
  name: 'ljc',
  age: '24'
});
console.log(per1);
console.log(per2);
console.log(per3);
```

## 实现 Object.create

## 手写实现 instanceof:star2:
[看下 insanceof 原理](../JS/JSPrototype.html#instanceof-原理)
```javascript
function myInstanceof(leftValue, rightValue) {
  // 左操作数的隐式原型
  const leftProto = leftValue.__proto__;
  // 右操作数的显示原型
  const rightPrototype = rightValue.prototype;
  // 循环调用出现左操作数的隐式原型为 null 时
  if (leftProto === null) {
    return false
  }
  // 左操作数的隐式原型等于有操作数的显示原型
  if (leftProto === rightPrototype) {
    return true
  }
  // 循环调用
  return myInstanceof(leftProto, rightValue);
}
```

## 组合使用构造函数模式和原型模式创建对象？
- 这种方式是在 class 出现之前最常用的方式
- 构造函数模式用来定义实例的属性，原型模式用来定义共有的方法。
```javascript
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
// 共有方法要在构造函数的显示原型上定义
Person.prototype.sayName = function() {
  console.log(this.name);
};
let lml = new Person('lml', 24, 'FE');
let xxs = new Person('xxs', 25, 'CV');
lml.sayName(); // lml
xxs.sayName(); // xxs
lml.bestFriend = 'ljc';
xxs.bestFriend = 'lyy';
console.log(lml);
console.log(xxs);
```

## 使用组合继承模拟类的继承
- 这种方式是在 class 出现之前，最常用来实现继承的方式
- 使用原型链实现对属性和方法的继承，使用构造函数来实现对实例属性对继承。
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function() {
  console.log(this.name);
};
function Student(name, age) {
  // 继承属性
  Person.call(this, name);
  this.age = age
}
// 继承方法
Student.prototype = new Person();
// 子类自有方法
Student.prototype.sayAge = function() {
  console.log(this.age);
};
let lml = new Student('lml', 24);
let xxs = new Student('xxs', 25);
lml.sayName(); // lml
xxs.sayName(); // xxs
lml.sayAge(); // 24
xxs.sayAge(); // 25
lml.friend = 'ljc';
xxs.friend = 'lyy';
console.log(lml);
console.log(xxs);
```

## 实现简易的 jQuery
```javascript
class jQuery {
  constructor(selector) {
    const result = document.querySelectorAll(selector);
    const length = result.length;
    for (let i = 0; i < length; i++){
      this[i] = result[i]
    }
    this.length = length
  }
  get(index) {
    return this[index]
  }
  each(fn) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      fn(elem)
    }
  }
  on(type, fn) {
    return this.each(elem => {
      elem.addEventListener(type, fn, false)
    })
  }
}
// 插件
jQuery.prototype.dialog = function(info) {
  alert(info);
};
// 继承于扩展
class myJQuery extends jQuery {
  constructor(selector) {
    super(selector)
  }
  addClass(className) {
    for (let i = 0; i < this.length; i++) {
      const elem = this[i];
      elem.classList.add(className)
    }
  }
}
```

## 获取 url 中的参数
```javascript
function getUrlParam(name) {
 const search = location.search;
 const queryParams = new URLSearchParams(search);
 return queryParams.get(name);
}
```

## 手写字符串的 trim 方法？
```javascript
String.prototype.myTrim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
```

## 实现 JSON.stringify

## 实现 JSON.parse

## 手写一个简易的 ajax
```javascript
// TODO 去完善
const xhr = new XMLHttpRequest();
xhr.open('GET', 'xxx', true); // true 为异步请求
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.log(xhr.status);
    }
  }
};
xhr.send(null)
```

## 实现 JSONP
```javascript
function jsonp(url, jsonpCallback, success) {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCallback] = function(data) {
    success && success(data)
  }
  document.body.appendChild(script)
}
```

## 实现 Promise:star2:

## 实现 Promise.all

## 实现 Promise.allSettled

## 实现 Promise.race

## 实现 Promise.finally

## 实现 async/await:star2:

## 实现发布订阅模式

## 实现 Event（event  Bus）

## 使用 proxy 实现简单的数据绑定
```html
<body>
  hello,world
  <input type="text" id="model">
  <p id="word"></p>
</body>
```
```javascript
const model = document.getElementById("model");
const word = document.getElementById("word");
var obj= {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
    },
  set: function(target, key, value, receiver) {
    console.log('setting',target, key, value, receiver);
    if (key === "text") {
      model.value = value;
      word.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  }
});

model.addEventListener("keyup",function(e){
  newObj.text = e.target.value
})
```

## 函数科里化实现
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

## 用setTimeout实现setInterval