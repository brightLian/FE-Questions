# JS 同步和异步相关知识
## 同步和异步的区别是什么？
- 基于 JS 是一个单线程的语言，同时只能做一件事。同步会阻塞代码执行，异步不会阻塞代码执行。

## 前端使用异步的场景？
- 网络请求：如发送 ajax 请求数据
- 定时任务：如 setTimeOut，setInterval

## 什么是回调地狱？
因为接口、数据、函数之间的依赖关系，需要通过一层一层的嵌套回调。导致代码耦合、后续难以修改和维护，产生回调地狱。

## 浏览器的事件循环是什么？:star2:
- 同步代码，一行一行放在调用栈中执行
- 遇到异步，会先记录下，等待时机
- 时机到了，就移动到回调队列中（先执行微任务，再执行宏任务）
- 如果调用栈为空，事件循环机制开始工作
- 轮询查找回调队列，如果有则移动到调用栈中执行
- 然后继续轮询查找

## node 的事件循环是什么？:star2:
<font color='red' size=5 font-weight="bold">重点再看!!!</font>
- node 也是单线程，相对浏览器多一个微任务 process.nextTick，一个宏任务 setImmediate。
	- process.nextTick 的回调和 promise 的回调都是微任务，但是 process.nextTick 的回调会比 promise 的先执行
	- setImmediate 是宏任务，但是和其他宏任务一起执行时得到的结果却是不确定的.
- **执行阶段：**
	- timers 阶段：执行 setTimeout() 和 setInterval() 的回调函数。
	- I/O callbacks 阶段：执行延迟到下一个循环的 I/O 回调。（也就是除了 setTimeout、setInterval、setImmediate、socket 的回调函数）
	- idle、prepare 阶段：仅 libuv 系统内部调用。
	- Poll 阶段：轮询的阶段
		- 如果 poll 队列不为空，会检索并执行新的 I/O 回调事件。
		- 如果为空：
			- 若调用了 setImmediate() 就结束 poll 阶段，直接进入 check 阶段。
			- 如果没有调用setImmediate()，就会等待，等待新的回调I/O事件的到来，然后立即执行
			- 如果脚本没有调用了setImmediate()，并且poll队列为空的时候，事件循环将检查哪些计时器 timer 已经到时间。 如果一个或多个计时器 timer 准备就绪，则事件循环将返回到计时器阶段，以执行这些计时器的回调，这也相当于开启了新一次的循环（tick）
	- check 阶段：在这个阶段执行 setImmediate() 的回调函数
	- close callbacks 阶段：执行关闭请求的回调函数，比如 socket.on('close', ...)
```javascript
// 下属两段代码执行的结果都是 3 2 1，可见 process.nextTick 的执行时机要比其他微任务早
Promise.resolve().then(() => console.log(1));
process.nextTick(() => console.log(2));
console.log(3);

process.nextTick(() => console.log(2));
Promise.resolve().then(() => console.log(1));
console.log(3);
```

## 为什么 setTimeout 和 setImmediate 执行顺序是不同的?
```javascript
// 多次执行这段代码，会发现输出结果是不同的
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
```
![setImmediate执行时机](/image/setImmediate.png)  
照理来说，setTimeout 在 timers 阶段，并且它回调执行的 delay 参数是0，而 setImmediate 在 check 阶段。 
但是 nodejs 官网关于 setTimeout 的定义有这样一句话：_When delay is larger than 2147483647 or less than 1, the delay will be set to 1. Non-integer delays are truncated to an integer._
   
也就是说，下面这两个表达式是等价的：   
```javascript
setTimeout(() => console.log(1), 0); 
setTimeout(() => console.log(1), 1);
```
而实际执行的时候，进入事件循环以后，有可能到了1ms，也有可能还没到，这取决于系统当时的状况。如果没到1ms，就会跳过 timers，向下执行，到了 check，先执行 setImmediate，然后再在下一次循环中执行 setTimeout。   
但是对于下面的代码，一定会先打印2，再打印1
```javascript
const fs = require('fs');

fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
```
他的执行过程是会先跳过 timers 阶段，回调直接进入 I/0 callback，然后向下执行，到了 check 阶段执行 setImmediate，然后才在下一次循环的 timers 执行 setTimeout。

## promise 的三种状态，如何变化？:star2:
<font color='#DEA3DC' size=5>重点再看!!!</font>
- 三种状态：
	- pending：进行中的状态，还没有结果
	- fulfilled：成功的状态
	- rejected：失败的状态
- 状态之间的变化：
	- promise 状态之间的变化是不可逆的。
	- pending 状态可以变化为 fulfilled 状态；pending 状态也可以变化为 rejected 状态。
	- pending 状态不会触发 then 和 catch 回调。
	- fulfilled 状态会触发后续的 then 回调。
	- rejected 状态会出发后续的 catch 回调。
- then 和 catch 对状态的影响：
	- then 正常返回 fulfilled 状态的 promise，里面有报错则返回 rejected 状态的 promise。
	- catch 正常返回 fulfilled 状态的 promise，里面有报错则返回 rejected 状态的 promise。
```javascript
// then 正常返回没有报错，返回 fulfilled 状态的 promise
const p1 = Promise.resolve().then(() => {
  return 1
});
console.log(p1); // 此时状态为 fulfilled
// fulfilled 状态触发 then 的回调
p1.then(() => {
  console.log(1.1) // 1.1 then 被执行 
}).catch(() => {
  console.log(1.2)
});
```
```javascript
// then 里面有报错，返回 rejected 状态的 promise
const p2 = Promise.resolve().then(() => {
  throw new Error('err')
});
console.log(p2); // 此时状态为 rejected
// rejected 状态触发 catch 回调
p2.then(() => {
  console.log(2.1);
}).catch(() => {
  console.log(2.2); // 2.2 catch 被执行
})
```
```javascript
// catch 正常返回 fulfilled 状态的 promise
const p3 = Promise.reject().catch((err) => {
  console.log(err)
});
console.log(p3); // 此时状态为 fulfilled
// fulfilled 状态触发 then 回调
p3.then(() => {
  console.log(3.1) // 3.1  then 被执行
}).catch(() => {
  console.log(3.2)
})
```
```javascript
// catch 里面有报错，返回 rejected 状态的 promise
const p4 = Promise.reject().catch((err) => {
  throw new Error(err)
});
console.log(p4); // 此时状态为 rejected 
// rejected 状态触发 catch 回调
p4.then(() => {
  console.log(4.1)
}).catch(() => {
  console.log(4.2) // 4.2 catch 被执行
})
```
特殊情况1
```javascript
// 1 3
Promise.resolve().then(() => {
  console.log(1) // 1 并且没有报错会触发后续的 then
}).catch(() => {
  console.log(2) // 1 中没有报错，不会被触发
}).then(() => {
  console.log(3) // 3 被1触发
})
```
特殊情况2
```javascript
// 1 2 4
Promise.resolve().then(() => {
  throw new Error('1') // 1 有报错会触发后续的 catch
}).catch(() => {
  console.log(2) // 2 被1的报错触发
}).catch(() => {
  console.log(3) // 2 中没有报错，不会被触发
}).then(() => {
  console.log(4) // 4 被2触发
})
```
特殊情况3
```javascript
Promise.reject().catch(() => {
  console.log(1) // 1 没有报错会触发后续的 then
}).catch(() => {
  console.log(2) // 1 中没有报错，不会被触发
}).then(() => {
  console.log(3); // 3 被1触发
  throw new Error('4') // 有报错后触发后续的 catch
}).catch(() => {
  console.log(5) // 5 被4的报错触发 
})
```

## async/await 是什么？
- 使用同步的语法，彻底消灭调回调函数的终极武器
- async/await 只是一个语法糖
- JS 还是单线程，还需要异步，还得是基于 eventLoop

## async/await 相对于 Promise 的优劣和选择？:star2:
- 优势：
	- 相对于 Promise 能够好的处理 then 的链式调用。（Promise 的链式调用的方式仍然是基于回调函数；async/await 是同步语法，彻底消灭回调函数。）
	- 在处理中间值 Promise 传递参数太麻烦。（每一个步骤都需要使用前一步的结果时难以维护）
- 劣势：
	- 不支持异步并行，多个异步代码之间不存在依赖关系时，后者仍需要等待前者完成。
	- 不支持异步竞速，多个接口有一个返回值时即认为完成请求。（类似 Promise.race() 方法。）
- 两者使用和场景：
	- 要执行多个异步任务，并且这些异步任务有前后依赖的关系，使用 async/await。
	- 要执行多个异步任务，但是这些异步任务没有依赖关系，使用 promise。
	- 执行多个异步任务，同时某个异步任务又返回值即认为成功，使用 promise。

## Promise 构造函数是同步还是异步，then方法呢？
promise构造函数是同步执行的，then 和 catch 方法是异步执行的
```javascript
// 执行结果是：124536，注意初始化 new Promise 时，传入的函数会立即被执行，then 和 catch 才是异步。
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => {
  console.log(val);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

setTimeout(function() {
  console.log(6);
});
```

## Promise 和 async/await 之间的关系？:star2:
- Promise 和 async/await 是相辅相成的关系。（二者不可相互替代）
- 执行 async 函数，返回的是 Promise 对象，如果返回的是一个非 Promise 对象，会自动转。
- 如果 await 后跟着的不是一个 Promise 对象，会自动转。
- await 相当于 Promise 的 then。
- 使用 try...catch 可以捕获异常，代替了 Promise 的 catch。
```javascript
async function fn1() {
  // 执行 async 函数，返回的是 Promise 对象，如果返回的是一个非 Promise 对象，会自动转。
  return 100
}
const res1 = fn1();
res1.then(data => {
  console.log(fn1()); // promise 对象
  console.log(data); // 100 
});

!(async function () {
  // await 相当于 Promise 的 then。
  const res2 = await fn1();
  console.log(res2); // 100
})();

!(async function () {
  // 如果 await 后跟着的不是一个 Promise 对象，会自动转。
  const res3 = await 100; // 相当于 await Promise.resolve(100)
  console.log(res3);
})()
```
try-catch 相关
```javascript
!(async function () {
  const p1 = Promise.reject('err1');
  try {
    const res1 = await p1;
    console.log(res1);
  } catch (err) {
    console.log(err) // 走到 catch
  }
})();

!(async function () {
  const p2 = Promise.reject('err2');
  const res1 = await p2;
  console.log(res1); // 不会走进来，在上一步直接报错
})()
```

## async/await、setTimeout、Promise 叠加执行输出问题？:star2:
注意几点：
- await 同行的是先执行后面的内容，然后变成异步
- 微任务要早于宏任务
```javascript
async function async1() {
  console.log('async1 start'); // 2
  await async2(); // 先执行 async2 再执行 await，后面的变为异步回调
  console.log('async1 end'); // 7
}

async function async2() {
  console.log('async2'); // 3
}

console.log('script start'); // 1

// 宏任务的异步挂起，最后执行
setTimeout(function () {
  console.log('setTimeout') // 9
});

async1();

new Promise(function (resolve) {
  console.log('promise1'); // 4
  resolve();
  // Promise.then 后面的内容是异步微任务
}).then(function () {
  console.log('promise2'); // 8
});

console.log('script end'); // 5

process.nextTick(function() {
  console.log('node nextTick') // 6
})
```
```javascript
async function async1() {
  console.log('async1 start'); // 2
  // await 同行的是先之后后面的，再执行 await 变为异步
  await async2();
  // await 后面的内容都可以看作为异步
  console.log('async1 end'); // 5
  await async3();
  // await 后面的内容都可以看作为异步
  console.log('async1 end2'); // 7
}
async function async2() {
  console.log('async2'); // 3
}
async function async3() {
  console.log('async3'); // 6
}
console.log('script start'); // 1
// 立即执行
async1();
console.log('script end'); // 4
```

## forEach、for...in 和 for...of 的区别？
- forEach 是常规的同步循环
- for...of、for...in 用于异步遍历，循环数组使用 for...of，循环对象使用 for...in。
```javascript
function muti(num) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(num * num)
    }, 1000 )
  })
}
const arrs = [1, 2, 3];

arrs.forEach(async function (item) {
  const res = await await muti(item);
  console.log(res);
});

(async function () {
  for (let i in arrs) {
    const res = await await muti(arrs[i]);
    console.log(res);
  }
})();

(async function () {
  for (let i of arrs) {
    const res = await await muti(i);
    console.log(res);
  }
})();
```

## 什么是宏任务和微任务，两者有什么区别？:star2:
- 宏任务：
	- 包括：setTimeout、setInterval、Ajax 和 DOM 事件，以及 node 中的 setImmediate。
- 微任务：
  - 包括：Promise、async/await 以及 node 中的 process.nextTick（微任务中优先级最高的一项）。
- 区别：
	- 微任务和宏任务都为异步，但是微任务的执行时机比宏任务早。
	- 微任务在 DOM 渲染完成之前触发、宏任务在 DOM 渲染完成之后触发。
	- 微任务是 ES6规定的、宏任务是浏览器规定的。