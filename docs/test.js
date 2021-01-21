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

// 节流函数
function throttle (fn, delay = 500) {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      return false
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
      timer = null;
    }, delay)
  }
}

// 防抖函数
function debounce (fn, delay = 500) {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      fn.apply(that, args);
    }, delay)
  }
}

// apply
Function.prototype.myApply = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params[1];
  that.fn = this;
  return that.fn(...args);
}

// call
Function.prototype.myCall = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params.slice(1);
  that.fn = this;
  return that.fn(...args);
}

// bind
Function.prototype.myBind = function () {
  const params = [...arguments];
  const that = params[0] || window;
  const args = params.slice(1);
  that.fn = this;
  return function () {
    that.fn(...args);
  }
}

// 闭包
function creteData() {
  const data = {};
  return {
    get (key) {
      return data[key];
    },
    set (key, val) {
      data[key] = val
    }
  }
}

// 不可变数据
function deepFreeze (obj) {
  let propNames = Object.getOwnPropertyNames(obj);
  for (const name of propNames) {
    const val = propNames[name];
    if (typeof val === 'object' && val !== null) {
      deepFreeze(val);
    }
  }
  return Object.freeze(obj);
}

// deepClone
function deepClone (obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result;
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    result = {}
  } else {
    result = []
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }
  return  result
}

// 深度比较
function isEqual (obj1, obj2) {
  if ((typeof obj1 === 'object' && obj1 !== null) || (typeof obj2 === 'object' && obj2 !== null)) {
    return obj1 === obj2
  }
  if (obj1 === obj2) {
    return true
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false
  }
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false
    }
  }
  return true
}

// new
function myNew () {
  const params = [...arguments];
  const thisConstructor = params[0];
  const args = params.slice(1);
  const o = {};
  o.__proto__ = thisConstructor.prototype;
  const result = thisConstructor.apply(o, args);
  return result instanceof Object ? result : o
}

// instanceof
function myInstanceof (leftValue, rightValue) {
  const leftValueProto = leftValue.__proto__;
  const rightValuePrototype = rightValue.prototype;
  if (leftValueProto === null) {
    return false
  }
  if (leftValueProto === rightValuePrototype) {
    return true
  }
  return myInstanceof(leftValueProto, rightValue);
}







































