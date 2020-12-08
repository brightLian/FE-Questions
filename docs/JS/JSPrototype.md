# JS 原型及原型链相关知识
## 谈谈你对原型和原型链的理解？:star2:
- 原型：
	- 每一个构造函数都有一个显示原型 prototype
	- 每一个实例都有一个隐式原型 \_\_proto\_\_
	- 实例的隐式原型等于其构造函数的显示原型
	- 在实例中获取属性和方法时，先在自身属性和方法中寻找，如果找不到则自动去 \_\_proto\_\_ 寻找。
- 原型链：
	- 访问一个实例中的方法或者属性，找不到自动去 \_\_proto\_\_ 中查找，直到最后查找到 Object.prototype 中。
	- 可以通过 hasOwnPrototype 确定属性或方法是否是实例自身的。
```javascript
let o1 = new Object({
	name: 'lml',
	sayName: function() {
	  console.log(this.name)
	}
});
Object.prototype; // 构造函数的显示原型
o1.__proto__; // 实例的隐式原型
Object.prototype === o1.__proto__; // true 实例的隐式原型===构造函数的显示原型
o1.sayName(); // 调用实例的方法
o1.toString(); // 调用构造函数的方法
o1.xxx; // 获取不存在的属性 undefined
o1.xxx(); // 获取不存在的方法，报错
o1.hasOwnProperty('sayName'); // true 判断 sayName 是否是实例的自有属性
o1.hasOwnProperty('toString'); // false 判断构造函数的方法是不是实例的自有属性
```

## 原型、构造函数、实例之间的关系？:star2:
- 关系：假设 o 为构造函数 Object 的实例。
	- 实例是通过构造函数 new 出来的
	- 实例的隐式原型等于其构造函数的显示原型：o.\_\_proto\_\_ = Object.prototype
	- 实例的 constructor 等于构造函数：o.constructor = Object
- 不能给构造函数直接添加属性。应该给构造函数的原型上添加属性。Xxx.prototype.xxx
- 每一个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。
- 可以通过 instanceof 操作符来确定原型和实例之间的关系。
```javascript
let o = new Object();
// 错误写法，不能直接给构造函数添加属性
// Object.log1 = function() {
//   console.log(1);
// }
// o.log1(); // 报错
// 正确写法，给构造函数的显示原型添加属性
Object.prototype.log1 = function() {
  console.log(1);
};
o.log1(); // 1，不会报错
o.__proto__ === Object.prototype; // true 实例的隐式原型 === 构造函数的显示原型 两个原型对象的指针相同
o.constructor === Object; // true 实例的 constructor === 构造函数
```

## new 运算符的执行过程？:star2:
- 在内存中新生成一个对象
- 链接到原型，即让空对象的隐式原型等于其构造函数的显示原型（例：o.\_\_proto\_\_ = Object.prototype）
- 绑定this（构造函数内部的 this 被赋值为这个新对象，即 this 指向新对象）
- 构造函数内部代码被执行（给新对象添加属性）
- 返回新的实例对象

## new Object() 和 Object.create() 的区别？
- 主要体现在原型：
	- {} 等同于 new Object()，原型是 Object.prototype
	- Object.create(null) 没有原型，Object.create({...}) 可以指定原型
```javascript
const obj1 = {
  a: 1,
  b: 2,
  sum() {
    return this.a + this.b
  }
};

const obj2 = new Object({
	a: 1,
	b: 2,
	sum() {
	  return this.a + this.b
	}
});

const obj3 = Object.create(null); // 无属性无原型

const obj4 = new Object(); // 无属性有原型

const obj5 = Object.create({
  a: 1,
  b: 2,
  sum() {
    return this.a + this.b
  }
}); // 无属性有原型，但是属性会绑定到原型上

const obj6 = Object.create(obj1); // 无属性有原型，原型被绑定到obj1
obj1.c = 3;
console.log(obj1 === obj6.__proto__); // true 
console.log(obj6.c) // 3
```

## instanceof 原理？
检测构造函数的 prototype 属性是否出现在实例的原型链上。(右操作数的 prototype 是否出现在左操作数的原型链上)

## 继承的方式？
- ES5：最常使用原型链 + 构造函数结合实现继承。（使用原型链实现对属性和方法的继承，使用构造函数来实现对实例属性的继承。）
- ES6：使用 class 通过 extends 进行继承。

## ES5 和 ES6继承方式比较？
- 在ES5中，继承实质上是子类先创建属于自己的 this，然后再将父类的方法添加到 this（也就是使用 Parent.apply(this)的方式
- 在ES6中，则是先创建父类的实例对象 this，然后再用子类的构造函数修改 this。

## 谈谈对 class 的理解？:star2:
- 实际 class 是一个语法糖，其底层还是通过原型链去创建的。所以它的绝大部分功能，ES5都可以做到。新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。
- **constructor：** 用于在类的定义块内部创建类的构造函数，告诉解释器在使用 new 操作符创建类的新实例时，应该调用这个函数。
- **属性：** 构造函数内部代码执行后，通过 this 绑定给实例绑定的值。
- **方法：** 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。
- **继承 extends：**
	- **super：** super 作为函数调用时，代表父类的构造函数。同时ES6要求，子类的构造函数必须执行一次 super 函数。
	- **扩展和重写：** 子类中的方法可以覆盖父类中的方法。
- **原型关系：**
	- 每个 class 都有显示原型 prototype
	- 每个实例都有隐式原型 \_\_proto\_\_
	- class 的显示原型全等于实例的隐式原型
- **基于原型的执行规则：**
	- 获取某个属性或方法时现在自身属性和方法中寻找
	- 如果找不到自动去 \_\_proto\_\_ 中去寻找
```javascript
// 声明一个基类
class People {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eating something`)
  }
}
// Student 继承于基类
class Student extends People {
  constructor(name, number) {
    super(name);
    this.number = number;
    this.sayNumber = function() {
      console.log(`${this.name} number is ${this.number}`)
    }
  }
  sayHi() {
    console.log(`姓名：${this.name}，学号：${this.number}`)
  }
}
// Teacher 继承于基类
class Teacher extends People {
  constructor(name, major) {
    super(name);
    this.major = major;
  }
  teachSome() {
    console.log(`姓名：${this.name}，科目：${this.major}`)
  }
  // 重写父类方法
  eat() {
    console.log(`${this.name} eating everything`)
  }
}
// 声明一个 Student 的实例
let xialuo = new Student('夏洛', 1);
// 声明一个 Teacher 的实例
let lml = new Teacher('连明亮', '语文');
xialuo.eat(); // 实例的 class 中没有这个方法，去其 class 父类中寻找
lml.eat(); // 对父类方法重写后再调用
console.log(Student.prototype);
console.log(xialuo.__proto__);
console.log(Student.prototype === xialuo.__proto__); // class 的显示原型等于其实例的隐式原型
console.log(Student.prototype.__proto__);
console.log(People.prototype === Student.prototype.__proto__); // true 子 class 的显示原型的隐式原型等于其父 class 的显示原型
console.log(lml.constructor === Teacher); // true 实例的 constructor 等于其构造函数
console.log(xialuo.hasOwnProperty('sayHi')); // false class 中的方法
console.log(xialuo.hasOwnProperty('sayNumber')); // true 自身的方法
console.log(xialuo.hasOwnProperty('name')); // true 自身的属性
console.log(xialuo.hasOwnProperty('eat')); // false class 的父类中的方法
```
图片解析如下:
![原型链图片解析](/image/prototype.png)

## class 原型本质是什么？
本质是 function，我们可以通过 typeof 来查看。
```javascript
class Person {
  constructor(name) {
    this.name = name
  }
}
typeof Person; // function
Person instanceof Function // true
```