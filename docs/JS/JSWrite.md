# JS 手写代码

## 手动实现数组展平？:star2:
我们可以利用 [].concat(arr)、
```javascript
// 展平一层
Array.prototype.flatOne = function () {
  return [].concat(...this)
}
// 完全展平
Array.prototype.flatComplete = function () {
  const isDeep = this.some(function (item) {
    return Object.prototype.toString.call(item) === '[object Array]'
  })
  if (!isDeep) {
    return this
  }
  const res = [].concat(...this);
  return res.flatComplete();
}
// 指定层级展平
Array.prototype.flat = function (deep) {
  const isDeep = this.some(function (item) {
    return Object.prototype.toString.call(item) === '[object Array]';
  })
  if (!isDeep || deep <= 0) {
    return this
  }
  const res = [].concat(...this);
  return res.flat(--deep);
}
let arr = [1, 2, [3, 4], [5, [6, [7]]]];
console.log(arr.flatOne());
console.log(arr.flatComplete());
console.log(arr.flat(2));
```

## 手写节流函数？:star2:
- 节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。
- 定义：在指定的时间间隔内只会执行一次任务。
- 应用：适合大量事件按时间平均触发（如：DOM 元素拖拽、滚动条事件等）
```javascript
function throttle (fn, delay = 500) {
  // 首行设置一个变量
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    // 定时器如果在执行时，直接返回
    if (timer) {
      return false
    }
    // 设置定时器
    timer = setTimeout(function () {
      // 调用函数并将定时器更改为false
      fn.apply(that, args);
      timer = null
    }, delay)
  };
}
```

## 手写防抖函数？:star2:
- 防抖函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。
- 定义：任务频繁触发的情况下，只有任务触发的时间间隔超过指定间隔的时候，任务才会执行。
- 应用：适合多次事件一次响应。（如：适合防止表单多次提交、输入框连续输入等）
```javascript
// 防抖函数
function debounce(fn, delay = 500) {
  // 首行设置一个变量
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    // 定时器如果在执行时，将定时器销毁
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      // 超过一段时间后调用函数
      fn.apply(that, args);
    }, delay)
  };
}
```

## 手写 apply 函数:star2:
- **apply：** 用于在特定的作用域中调用函数，接受两个参数。一个参数是函数运行的作用域，另一个参数是函数的参数数组。
```javascript
Function.prototype.myApply = function() {
  const params = [...arguments]; // 统一获取参数
  const that = params[0] || window; // 获取要绑定的作用域
  const args = params[1]; // 获取要指定的参数数组
  that.fn = this; // 绑定作用域
  return that.fn(...args) // 执行函数
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
  const that = params[0] || window; // 获取要绑定的作用域
  const args = params.slice(1); // 获取要指定的参数数组
  that.fn = this; // 绑定作用域
  return that.fn(...args); // 执行函数
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
  const that = params[0] || window; // 获取要绑定的作用域
  const args = params.slice(1); // 获取要指定的参数数组
  that.fn = this; // 绑定作用域
  return function() {
    that.fn(...args) // 返回函数
  }  
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
const fn2 = fn1.myBind(a, 2.1, 2.2);
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
console.log(isEqual(obj1, obj2)); // true key-value 相同即可。
```

## 实现 new:star2:
[看下 new 执行过程](../JS/JSPrototype.html#new-运算符的执行过程)
```javascript
function myNew() {
  const params = [...arguments];
  const thisConstructor = params[0]; // 获取构造函数
  const args = params.slice(1); // 获取其余参数
  // 在内存中声明一个对象
  const o = {};
  // 对象的隐式原型链接到构造函数的显示原型
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
使用现有对象来提供新创建对象的 \_\_proto\_\_
```javascript
function myCreate() {
  const params = [...arguments];
  const thisConstructor = params[0];
  const F = function () {};
  F.prototype = thisConstructor;
  return new F();
}
const testCreate = myCreate({a: 1, b: 2}); 
console.log(testCreate);
```

## 手写实现 instanceof:star2:
原理就是：判断右操作数的显示原型是否出现在左操作数的原型链上。
[看下 insanceof 原理](../JS/JSPrototype.html#instanceof-原理)
```javascript
// 递归方式
function myInstanceof(leftValue, rightValue) {
  // 左操作数的隐式原型
  const leftValueProto = leftValue.__proto__;
  // 右操作数的显示原型
  const rightValuePrototype = rightValue.prototype;
  // 循环调用出现左操作数的隐式原型为 null 时
  if (leftValueProto === null) {
    return false
  }
  // 左操作数的隐式原型等于有操作数的显示原型
  if (leftValueProto === rightValuePrototype) {
    return true
  }
  // 循环调用
  return myInstanceof(leftValueProto, rightValue);
}

// 循环方式
function myInstanceof2(leftValue, rightValue) {
  let leftValueProto = leftValue.__proto__;
  while (leftValueProto) {
    if (leftValueProto === rightValue.prototype) {
      return true
    }
    leftValueProto = leftValueProto.__proto__
  }
  return false
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

## 使用组合继承模拟类的继承:star2:
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

## 手写一个简易的 ajax
```javascript
function ajax(method = 'get', url, data, callback) {
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP'); // 兼容老版本 IE
  }
  // get 请求需要将参数拼接到 url 上
  let paramArr = [];
  let encodeData;
	if (data instanceof Object) {
    for (let key in data) {
    // 参数拼接需要通过 encodeURIComponent 进行编码
    paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) )
    }
    encodeData = paramArr.join('&')
	}
  if (method.toLocaleLowerCase() === 'get') {
   const index = url.indexOf('?');
   if (index === -1) {
     url += '?';
   } else {
     url += '&'
   }
   url += encodeData                 
  }
  xhr.open(method, url, true);
  if (method.toLocaleLowerCase() === 'get') {
    xhr.send(null)  
  } else {
    xhr.send(JSON.stringify(data))
  }
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        return callback(JSON.parse(xhr.responseText));
      } else {
        return xhr.status;
      }
    }
  };
}
const testUrl = 'https://www.fastmock.site/mock/3410de68d1e03849d328e0b0651c4f1f/api/api/services/app/TransactionBill/GetTransactionBillInfo';
const ajaxGet = ajax('get', testUrl, { a: 1 }, function (res) {
  console.log(res)
});
```

## 实现 JSONP
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

## 实现 Promise:star2:
```javascript
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
myPromise.prototype.then=function(onFullfilled,onRejected){
  let self=this;
  switch(self.status){
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      onRejected(self.reason);
      break;
    default:
  }
}
```

## 实现 Promise.all:star2:
Promise.all 的特点：
- 接收一个 Promise 实例的数组
- 如果元素不是一个 Promise 对象，则使用 Promise.resolve() 转成 Promise 对象
- 如果全部成功，状态变为 resolved，返回值即那个组成一个数组传给回调
- 只要有一个失败，状态变为 rejected，返回值将直接作为回调
```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(promises) === '[object, Array]') {
        return reject(new TypeError('arguments must be an array'));
    }
    let resultCount = 0;
    let promisesLength = promises.length;
    let results = new Array(promisesLength);
    for (let i = 0; i < promisesLength; i++) {
      Promise.resolve(promises[i]).then((res) => {
        resultCount++;
        results[i] = res;
        if (resultCount === promisesLength) {
          return resolve(results)
        }
      }, (reason) => {
        return reject(reason)
      })
    }
  })
};

const p1 = Promise.resolve(1),
      p2 = Promise.reject(2),
      p3 = Promise.resolve(3);
Promise.myAll([p1, p2, p3]).then((results) => {
  //then方法不会被执行
  console.log(results);
}).catch(function (e){
  //catch方法将会被执行，输出结果为：2
  console.log(e);
})
```

## 实现 Promise.allSettled
Promise.allSettled 的特点：
- 接收一个 Promise 实例的数组
- 如果元素不是一个 Promise 对象，则使用 Promise.resolve() 转成 Promise 对象
- 如果传入的 promise 全部执行完后，返回值为处理后的集合
```javascript
Promise.myAllSettled = function(promises) {
  return new Promise((resolve, reject) => {
     if (Object.prototype.toString.call(promises) === '[object, Array]') {
            return reject(new TypeError('arguments must be an array'));
     }
     let resultCount = 0;
     let promisesLength = promises.length;
     if (promisesLength === 0) {
       resolve([]);
       return;
     }
     let results = new Array(promisesLength);
     for (let i = 0; i < promisesLength; i++) {
       Promise.resolve(promises[i]).then((res) => {
         resultCount++;
         results[i] = {
           status: 'fulfilled',
           value: res
         };
         if (resultCount === promisesLength) {
           return resolve(results)
         }
       }, (reason) => {
         resultCount++;
         results[i] = {
           status: 'rejected',
           reason
         };
         if (resultCount === promisesLength) {
           return resolve(results)
         }
       })
     }
  })
};
const p1 = Promise.resolve(1),
      p2 = Promise.reject(2),
      p3 = Promise.resolve(3);
Promise.myAllSettled([p1, p2, p3]).then((results) => {
  console.log(results);
  results.forEach((result) => console.log(result.status));
});
```

## 实现 Promise.race:star2:
Promise.race 的特点：
- 接收一个 Promise 实例的数组
- 如果元素不是一个 Promise 对象，则使用 Promise.resolve() 转成 Promise 对象
- 有一个 Promise 完成时，无论成功还是失败，返回值直接作为回调
```javascript
Promise.myRace = function(promises) {
  return new Promise((resolve, reject) => {
    if (Object.prototype.toString.call(promises) === '[object, Array]') {
            return reject(new TypeError('arguments must be an array'));
    }
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject)
    })
  })
};
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1')
   }, 100)
});
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('2')
   }, 500)
});
Promise.myRace([p1, p2]).then((results) => {
  // p1和p2中，p1 先完成，输出结果为 1 
  console.log(results);
}).catch(function (e){
  // p2 不会被执行
  console.log(e);
})
```

## 实现 Promise.finally
Promise.finally 的特点：
- 在 Promise 结束时，无论结果是成功还是失败，都会执行指定的回调函数
- 无论成功还是失败都会返回一个 Promise
```javascript
Promise.prototype.myFinally = function(callback) {
  let P = this.constructor;
  console.log(this);
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
};
const p1 = Promise.resolve(1);
p1.then((result) => {
  console.log(result);
}).catch((reason) => {
  console.log(reason);
}).myFinally(() => {
  console.log(2); // 永远都会被触发
})
```

## 实现 async/await:star2:
```javascript
function asyncToGenerator(generatorFunc) {
  // 返回的是一个新的函数
  return function() {
  
    // 先调用generator函数 生成迭代器
    // 对应 var gen = testG()
    const gen = generatorFunc.apply(this, arguments)

    // 返回一个promise 因为外部是用.then的方式 或者await的方式去使用这个函数的返回值的
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))
    return new Promise((resolve, reject) => {
    
      // 内部定义一个step函数 用来一步一步的跨过yield的阻碍
      // key有next和throw两种取值，分别对应了gen的next和throw方法
      // arg参数则是用来把promise resolve出来的值交给下一个yield
      function step(key, arg) {
        let generatorResult
        
        // 这个方法需要包裹在try catch中
        // 如果报错了 就把promise给reject掉 外部通过.catch可以获取到错误
        try {
          generatorResult = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        // gen.next() 得到的结果是一个 { value, done } 的结构
        const { value, done } = generatorResult

        if (done) {
          // 如果已经完成了 就直接resolve这个promise
          // 这个done是在最后一次调用next后才会为true
          // 以本文的例子来说 此时的结果是 { done: true, value: 'success' }
          // 这个value也就是generator函数最后的返回值
          return resolve(value)
        } else {
          // 除了最后结束的时候外，每次调用gen.next()
          // 其实是返回 { value: Promise, done: false } 的结构，
          // 这里要注意的是Promise.resolve可以接受一个promise为参数
          // 并且这个promise参数被resolve的时候，这个then才会被调用
          return Promise.resolve(
            // 这个value对应的是yield后面的promise
            value
          ).then(
            // value这个promise被resove的时候，就会执行next
            // 并且只要done不是true的时候 就会递归的往下解开promise
            // 对应gen.next().value.then(value => {
            //    gen.next(value).value.then(value2 => {
            //       gen.next() 
            //
            //      // 此时done为true了 整个promise被resolve了 
            //      // 最外部的test().then(res => console.log(res))的then就开始执行了
            //    })
            // })
            function onResolve(val) {
              step("next", val)
            },
            // 如果promise被reject了 就再次进入step函数
            // 不同的是，这次的try catch中调用的是gen.throw(err)
            // 那么自然就被catch到 然后把promise给reject掉啦
            function onReject(err) {
              step("throw", err)
            },
          )
        }
      }
      step("next")
    })
  }
}
```

## 实现发布订阅模式/ eventBus
```javascript
let eventEmitter = {
    // 缓存列表
    list: {},
    // 订阅
    on (event, fn) {
        let _this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    },
    // 监听一次
    once (event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on () {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        on.fn = fn;
        _this.on(event, on);
        return _this;
    },
    // 取消订阅
    off (event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
            fns && (fns.length = 0);
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === fn || cb.fn === fn) {
                    fns.splice(i, 1);
                    break
                }
            }
        }
        return _this;
    },
    // 发布
    emit () {
        let _this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        let event = [].shift.call(arguments),
            fns = [..._this.list[event]];
        // 如果缓存列表里没有 fn 就返回 false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历 event 值对应的缓存列表，依次执行 fn
        fns.forEach(fn => {
            fn.apply(_this, arguments);
        });
        return _this;
    }
};

function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
```

## 使用 proxy 实现简单的数据绑定:star2:
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

## 实现函数柯里化？:star2:
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

## 用 setTimeout 实现 setInterval？:star2:
```javascript
function mySetInterval() {
  mySetInterval.timer = setTimeout(() => {
    arguments[0]()
    mySetInterval(...arguments)
  }, arguments[1])
}

mySetInterval.clear = function() {
  clearTimeout(mySetInterval.timer)
}
```

