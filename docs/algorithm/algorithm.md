# 前端基础算法
## 获取多个数字中的最大值？
```javascript
function max() {
  const nums = Array.prototype.slice.call(arguments);
  let max = nums[0];
  nums.forEach(n => {
    if (n > max) {
      max = n
    }
  });
  return max
}

Math.max(10, 20, 30, 40);
max(10, 20, 30, 40);
```

## 前端排序
- 数组的 sort 方法
```javascript
function mySort() {
  let arrs = Array.prototype.slice.call(arguments);
  return arrs.sort(function(a, b) {
    return a - b
  })
}
```
- 快排原理：
	- 选择基准值(base)，原数组长度减一(基准值)，使用 splice
	- 循环原数组，小的放左边(left数组)，大的放右边(right数组);
	- concat(left, base, right)
	- 递归继续排序 left 与 right
```javascript
function quickSort(arr) {
    if(arr.length <= 1) {
        return arr;  //递归出口
    }
    let left = [];
		let right = [];
		let current = arr.splice(0,1); 
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < current) {
            left.push(arr[i])  //放在左边
        } else {
            right.push(arr[i]) //放在右边
        }
    }
    return quickSort(left).concat(current,quickSort(right));
}
```

## 天平找次品
有n个硬币，其中1个为假币，假币重量较轻，你有一把天平，请问，至少需要称多少次能保证一定找到假币?      
解题原理使用三等分算法：
- 将硬币分成3组，随便取其中两组天平称量
- 平衡，假币在未上称的一组，取其回到 1 继续循环
- 不平衡，假币在天平上较轻的一组， 取其回到 1 继续循环

## 数组去重？
```javascript
// 传统方式，使用循环
function uniqueArr(arr) {
  const res = [];
  arr.forEach(item => {
    if (!res.includes(item)) {
      res.push(item)
    }
  });
  return res
}

// 使用 Set
function uniqueArr2(arr) {
  return [...new Set(arr)]
}

// 校验
console.log(uniqueArr([1,2,3,4,5,3,21]));
console.log(uniqueArr2([1,2,3,4,5,3,21]));
``` 

## 数组中重复元素

## 数组并集？
并集：两个数组中所有不重复的元素。
```javascript
// 传统方式，循环
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
function unionSet (arr1, arr2) {
  let result = [];
  // 避免 arr1 中有重复元素
  arr1.forEach(item => {
    if (!result.includes(item)) {
      result.push(item)
    }
  });
  let len = arr2.length;
  for (let i = 0; i < len; i++) {
    if (!result.includes(arr2[i])) {
      result.push(arr2[i])
    }
  }
  return result
}
console.log(unionSet(arr1, arr2));
```
```javascript
// 使用 set
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
function unionSet2 (arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}
console.log(unionSet2(arr1, arr2));
```

## 数组交集？
交集：两个数组中相同的元素。
```javascript
// 传统方式循环
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
function intersection(arr1, arr2) {
  let result = [];
  let len = arr1.length;
  for (let i = 0; i < len; i++) {
    if (arr2.includes(arr1[i])) {
      result.push(arr1[i])
    }
  }
  return result;
}
console.log(intersection(arr1, arr2));
```
```javascript
// 使用 set 方法
let arr1 = [1, 2, 3];
let arr2 = [2, 3, 4];
function intersection2(arr1, arr2) {
  return [...new Set([...arr1].filter(x => new Set([...arr2]).has(x)))];
}
console.log(intersection2(arr1, arr2));
```

## 数组合并去重排序
```javascript
// 传统方式：使用循环 + sort
function uniqueSort(arr1, arr2) {
  let result = [];
  arr1.forEach(item => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  let len = arr2.length;
  for (let i = 0; i < len; i++) {
    if (!result.includes(arr2[i])) {
      result.push(arr2[i])
    }
  }
  result.sort(function(a, b) {
    return a - b 
  });
  return result 
}
let arr1 = [3, 4, 5, 5, 6];
let arr2 = [1, 2, 3, 4, 5];
console.log(uniqueSort(arr1, arr2));
```
```javascript
// 使用 set
function uniqueSort2 (arr1, arr2) {
  return [...new Set([...arr1, ...arr2])].sort((a, b) => {
    return a - b
  })
}
let arr1 = [3, 4, 5, 5, 6];
let arr2 = [1, 2, 3, 4, 5];
console.log(uniqueSort2(arr1, arr2));
```

## 手动实现数组展平？:star2:
```javascript
// 展平一层
function flatOne (arr) {
  return [].concat(...arr);
}
// 完全展平
function completeFlat(arr) {
  const isDeep = arr.some(item => item instanceof Array);
  if (!isDeep) {
    return arr
  }
  const res = [].concat(...arr);
  return completeFlat(res);
}
// 指定展平层级（模拟数组对 flat 方法）
function flat (arr, dep) {
  const isDeep = arr.some(item => item instanceof Array);
  if (!isDeep || dep <= 0) {
    return arr
  }
  const res = [].concat(...arr);
  return flat(res, --dep);
}
console.log(flatOne([1, 2, [3, [4, [5]]]]));
console.log(completeFlat([1, 2, [3, [4, [5]]]]));
console.log(flatOne([1, 2, [3, [4, [5]]]], 2));
```
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

## 数组打乱、随机排序？
我们可以使用 sort + random 函数来进行打乱，但据统计不是完全打乱。
```javascript
function upset (arr) {
  return arr.sort(function() {
    return .5 - Math.random();
  })
}
```
要想完全打乱可以使用洗牌算法。
```javascript
function shuffle (arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let idx = Math.floor(Math.random() * (len - i));
    [arr[len - i - 1], arr[idx]] = [arr[idx], arr[len - i -1]];
  }
  return arr
}
```

## 打印1-10000之间的对称数
```javascript
for (let i = 1; i < 10000; i++) {
  let len = String(i).length; 
  if (len > 1) {
    let leftNum = String(i).substr(0, Math.floor(len / 2));
    let rightNum = String(i).substr(Math.ceil(len / 2, len)).split().reverse().join();
    if (leftNum === rightNum) {
      console.log(i);
    }
  }
}
```

## 版本号处理问题
versions 是一个项目的版本号列表，因多人维护，不规则，动手实现一个版本号处理函数
```javascript
let versions = ["1.45.0", "1.5", "6", "3.3.3.3.3.3.3"];
// 要求从小到大排序，注意'1.45'比'1.5'大
function sortVersion(versions) {
  return versions.sort((a, b) => {
    let aVersion = a.split('.');
    let bVersion = b.split('.');
    let len = aVersion.length > bVersion.length ? aVersion.length : bVersion.length;
    for (let i = 0; i < len; i++) {
      let x = aVersion[i] || 0;
      let y = bVersion[i] || 0;
      if (x - y !== 0) {
        return x - y
      }
    }
    
  })
}
console.log(sortVersion(['1.5','1.45.0','3.3.3.3.3.3','6']))
```

## 动手实现一个 repeat 方法
```javascript
function repeat(func, times, wait) {
 if (times <= 0) return;
 return function() {
   let repeatTimes = times;
   let interval = setInterval(() => {
     func();
     repeatTimes--;
     if (repeatTimes === 0) {
       clearInterval(interval)
     }
   }, wait)
 }
}
function console1() {
  console.log(1)
}
const repeatFunc = repeat(console1, 4, 1000);
repeatFunc();
```

## 毒水问题？
- 题目：有 100 瓶水，其中有一瓶有毒，小白鼠只要尝一点带毒的水 3 天后就会死亡，至少要多少只小白鼠才能在 3 天内鉴别出哪瓶水有毒？
- 分析：考察对二进制的理解，把所有的瓶子用二进制进行编码。各个位数为1的融合，会分装到7瓶里面，然后分别给7只老鼠喂进去。死的为1，不死为0。转为二进制后即可。

## 求最大公共前缀&&公共路径前缀
如\['aaafsd', 'aawwewer', 'aaddfff'\] => 'aa'    
如\['aa/bb/sd', 'aa/bb/wwewer', 'aa/bb/ddfff'\] => 'aa/bb'

## 一堆数字字符串组成最大数是多少？
如：\[50, 2, 5, 9\] => 95502

## 一副扑克牌，随机抽 5 张，判断是否是顺子，大小王可以替代任意牌。

## 使用链表指针获取 JSON 的节点值
```javascript
const json = {
  a: {
    b: {
      c: 1
    }
  },
  d: {
    e: 2
  }
};
const path1 = ['a', 'b', 'c'];
const path2 = ['d', 'e'];

let p = json;
path1.forEach(k => {
  p = p[k];
})
``` 