# JS 作用域及闭包相关知识
## 谈谈你对作用域的理解？:star2:
作用域分为以下三类：
- **全局作用域：** 变量能够在程序中任何地方访问。
- **函数作用域：** 在 JavaScript 中每声明一个函数就会创建一个函数作用域，函数内部声明的变量只能在函数内部使用。
- **块级作用域：** 在代码块内声明的变量，只能在代码块中被访问。

## 谈谈你对作用域链的理解？:star2:
- 定义：当代码在一个环境中执行时，会创建变量对象的一个作用域链。
- 用途：保证变量和函数之间的有序访问。
- 理解：其本质是 JavaScript 在执行过程中会创造可执行上下文，可执行上下文中的词法环境中含有外部词法环境的引用，
我们可以通过这个引用获取外部词法环境的变量、声明等，这些引用串联起来一直指向全局的词法环境，因此形成了作用域链。
- **简言之：内部环境可以通过作用域链访问所有的外部环境中的变量和函数，外部环境不能访问内部环境中的任何变量和函数。**
```javascript
// 看这个题 undefined、10、 20
var a = 10;
(function () {
    console.log(a);
    a = 5;
    console.log(window.a);
    var a = 20;
    console.log(a)
})(); // undefined 10 20
console.log(a) // 10
// 原因是：函数内部 a = 20 在内部发生了变量提升，所以第一个为 undefined
// 在全局 var 声明的变量可以通过 window.xxx 访问，自执行函数声明的变量不会污染全局，所以第二个为 10
// var = 20 被赋值了，所以第三个为 20
``` 

## 什么是自由变量？
- **定义：** 一个变量在当前作用域中没有定义，但是被使用了，这个变量在这里就是自由变量。
- **规则：** 在变量使用的位置向上级作用域一层一层寻找，直到找到为止。如果全局作用域都没有找到，则报错 xx is not defined。
- **闭包中的自由变量规则：** 在变量定义的位置向上级作用域一层一层寻找。

## 谈谈你对 this  的理解，如何取值？:star2:
- **简述：** 谁调用指向谁，根据运行时的上下文确定，而不是在定义时就确定。
- **在普通函数中使用 this：** this 在浏览器中指向 window，在 node.js 环境中指向 global。
- **在箭头函数中使用：** this 就是它外层函数的 this，没有外层函数则指向 window/global。
- **在对象的方法中使用：** this 指向对象本身。
- **在构造函数中被调用：** this 指向构造函数创建的实例。
- **使用 apply、call、bind 改变指向：** 根据你传入的参数决定。
```javascript
// 注意两种不同的 this
const zhangsan1 = {
  name: 'zhangsan1',
  sayHi() {
    console.log(this)
  },
  // 注意异步代码都是在全局作用域中执行的，因此 this 指向 window
  waitSayHi() {
    setTimeout(function() {
      console.log(this);
    })
  }
};
const zhangsan2 = {
  name: 'zhangsan2',
  sayHi() {
    console.log(this)
  },
  // 此处因为箭头函数的 this 指向外层函数的 this
  waitSayHi() {
    setTimeout(() => {
      console.log(this)     
    })
  },
	// 此处因为箭头函数的 this 指向外层函数的 this，但是没有外层函数所以指向 window
	waitSayHi2: () => {
		console.log(this);
	},
};
zhangsan1.sayHi() // 当前对象
zhangsan2.sayHi() // 当前对象
zhangsan1.waitSayHi() // window
zhangsan2.waitSayHi() // 当前对象
zhangsan2.waitSayHi2() // window
```

## 如何改变 this 的指向？:star2:
apply 和 call 都是改变 this 的指向并传递参数后执行函数。     
bind 是改变 this 的执行后返回一个函数，然后在调用新函数时再传递参数并执行。     
此外 call 的性能要比 apply 好，因为 call 接收的参数可以直接用作函数执行时的参数，省去了参数结构等操作。
- **apply：** 用于在特定的作用域中调用函数，接受两个参数。一个参数是函数运行的作用域，另一个参数是函数的参数数组。
- **call：** 用于在特定的作用域中调用函数，接收不定数目参数。第一个参数是函数运行时的作用域，其余参数直接作为函数参数。
- **bind：** 创建一个新函数，接受不定数目参数，第一个参数作为函数运行时的作用域，其余参数作为函数参数，需要重新执行新的函数。
```javascript
var name = 'lml'; // 相当于 window.name
function fn1(age) {
  console.log(this.name, age);
}
fn1(1); // lml 1 在全局中执行

let obj1 = { name: 'xxs' };
let obj2 = { name: 'ljc' };
let obj3 = { name: 'lyy' };
fn1.apply(obj1, [2]); // xxs 2 apply 改变 this 指向
fn1.call(obj2, 3); // ljc 3 call 改变 this 指向
let fn2 = fn1.bind(obj3); // bind 给新的函数绑定 this，函数不会被自动执行
fn2(4); // lyy 4 手动执行绑定 this 的函数
fn2.apply(obj1, [5]); // lyy 5，this 的指向不会再被改变了。
```

## this 不同场景的取值？
注意一点即可：普通函数的 this 是在执行时确定的而非在定义时确定。
```javascript
const User = {
  count: 1,
  getCount() {
    return this.count
  }
};
console.log(User.getCount()); // 1
const func = User.getCount;
console.log(func()); // undefined，函数中的 this 再执行时是 window
console.log(func.apply(User, [])) // 1，通过 apply 改变 this 的指向
```

## 箭头函数使用时的注意事项？:star2:
- 函数体内的 this 对象在定义时就确定了，而不是使用时所在的对象。
- 不可以作为构造函数，也就是不能使用 new 命令，会报错。
- 不可以使用 arguments 对象，该对象在函数不存在。但是可以使用 rest 参数来代替。
- 不可以使用 yield 函数，因为箭头函数不能做 Generator 函数。

## 什么是尾调用、尾递归？
- **尾调用：** 就是某个函数最后一步是调用另一个函数。
- **尾递归：** 如果尾调用的函数是自身，就是尾递归。

## 谈谈你对闭包的理解？:star2:
- 什么是闭包：有权访问另一个函数作用域中的变量的函数。
- 闭包的两种形式：函数作为参数被传递，函数作为返回值。
- 闭包的作用：闭包的最大作用是隐藏变量，通过它可以实现变量私有化、储存变量、保证变量不被外部侵染。
- 闭包中自由变量：闭包中自由变量的查找是在函数定义的位置向上级作用域查找，而不是在执行的地方查找。（和一般的自由变量不同）
- 闭包的缺点：闭包中的变量会常驻内存，得不到释放。有的会引起内存泄漏（在 IE 中）。
```javascript
// 闭包的两种形式之一：函数作为返回值
function create() {
  let a = 100;
  return function() {
    console.log(a)
  }
}
let fn = create();
let a = 200;
fn() // 100 闭包中自由变量被使用时，是在其函数定义位置一层一层向上寻找。
```
```javascript
// 闭包的两种形式之一：函数作为参数
function print(fn) {
  let a = 200;
  fn()
}
let a = 100;
function fn() {
  console.log(a)
}
print(fn) // 100 闭包中自由变量被使用时，是在其函数定义位置一层一层向上寻找。
```

## 什么是内存泄露？
- **定义：** 不会用到的内存，没有及时释放就是内存泄露。
- 引起方式：
	- 意外的全局变量：无法被回收。
	- 定时器：未被正确关闭，导致所引用外部变量无法被释放。
	- 事件监听：没有正确销毁。
	- 闭包：父级变量无法被释放。

## JavaScript 内存管理是什么？
JavaScript 是在创建变量（对象，字符串等）时自动进行了分配内存，并且在不使用它们时会 "自动" 释放。释放的过程称为垃圾回收。
- 新生代内存：对象的存活时间较短，新生对象或只经过一次垃圾回收的对象。
- 老生代内存：对象的存活时间较长，经历过一次或多次垃圾回收的对象。

## 谈谈 JavaScript 的垃圾回收机制？
- JS 具有自动的垃圾回收机制，执行环境会负责管理代码执行过程中使用的内存。
- 标记清除：
	- 目前主流浏览器都是采用标记清除式的垃圾回收策略。
	- 通过给当前不使用的值加上标记，定期回收有标记的内存。
- 引用计数：
	- 目前 JS 引擎都不再使用此方法。
	- 通过跟踪记录所有值被引用的次数，次数为0时会被回收。
