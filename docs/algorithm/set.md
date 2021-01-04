# 集合
## 集合的简介
- 一种无序且唯一的数据结构
- JS 中的 Set 就是集合

## 栈的应用场景
- 输出的值无序且唯一

## 常用操作
- 数组去重
```javascript
const arr = [1, 1, 2, 2];
const arr2 = [...new Set(arr)];
```
- 判断元素是否在集合中
```javascript
const arr = [1, 1, 2, 2];
const set = new Set(arr);
console.log(set.has(1)); // true
console.log(set.has(3)); // false
```
- 求交集
```javascript
const set1 = new Set([1, 2]);
const set2 = new Set([2, 3]);
console.log(new Set([...set1].filter(function(item) {
  return set2.has(item);
})))
```