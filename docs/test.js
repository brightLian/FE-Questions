// 节流
function throttle (fn, delay) {
  let timer = null;
   return function () {
     const that = this;
     const args = arguments;
     if (timer) {
       return false
     }
     timer = setTimeout(function () {
       fn.apply(that, args);
       timer = null;
     }, delay)
   }
}

// 防抖
function debounce (fn, delay) {
  let timer = null;
  return function () {
    const that = this;
    const args = arguments;
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
  const that = params[0];
  const args = params.slice(1);
  that.fn = this;
  return that.fn(...args);
}

// bind
Function.prototype.myBind = function () {
  const params = [...arguments];
  const that = params[0];
  const args = params.slice(1);
  that.fn = this;
  return function () {
    that.fn(...args);
  }
}

// 闭包实际应用
function createCache () {
  const data = {};
  return {
    set(key, value) {
      data[key] = value;
    },
    get(key) {
      return data[key];
    }
  }
}

// 不可变属性
function deepFreeze (obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let name of propNames) {
    const value = obj[name];
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value);
    }
  }
  return Object.freeze(obj);
}

// 深拷贝
function deepClone (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result;
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    result = []
  } else {
    result = {}
  }
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result
}

// 深度比较
function isEqual(obj1, obj2) {
  if (!isObj(obj1) || !isObj(obj2)) {
    return obj1 === obj2
  }
  // 浅拷贝直接返回 true
  if (obj1 === obj2) {
    return true
  }
  const obj1Key = Object.keys(obj1);
  const obj2Key = Object.keys(obj2);
  if (obj1Key.length !== obj2Key.length) {
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
function isObj(obj) {
  return typeof obj === "object" && obj !== null
}

// new
function myNew () {
  const params = [...arguments];
  const thisConstructor = params[0];
  const args = params.slice(1);
  const o = {};
  o.__proto__ = thisConstructor;
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
  myInstanceof(leftValueProto, rightValue);
}





Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) {
      return arr
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);
    const orderLeft = rec(left);
    const orderRight = rec(right);
    const res = [];
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift());
      } else if (orderLeft.length) {
        res.push(orderLeft.shift())
      } else {
        res.push(orderRight.shift())
      }
    }
    return res;
  }
  const res = rec(this);
  res.forEach((n, i) => {
    this[i] = n;
  })
}

var prefixesDivBy5 = function(A) {
  let len = A.length;
  let res = [];
  let curNum = 0
  for (let i = 0; i < len; i++) {
    curNum = parseInt(A.slice(0, i).join(''), 2);
    console.log(curNum);
    if (curNum % 5 === 0) {
      res.push(true);
    } else {
      res.push(false);
    }
  }
  return res
};
console.log(prefixesDivBy5([1,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,1,1,1,1,1,1,0,0,0,1,0,1,1,1,1,0,1,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,1,1,0,0,1,1,1]))


console.log(111111)








