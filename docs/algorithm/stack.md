# 栈
## 栈的简介
- 一种后进先出的数据结构
- 使用数组 push()、pop() 可以模拟栈

## 栈的应用场景
- 需要后进先出的场景（比如：十进制转二进制、判断字符串的有效括号、函数调用堆栈等）

## 题中常用操作
- 删除指定位置的一个元素 array.splice(index, 1);
- 删除数组中的第一个元素 array.shift();
- 删除数组中的最后一个元素 array.pop();
- 获取一个数组中的最大值 Math.max(...arr);
- 获取一个数组中的最小值 Math.min(...arr);
- 获取数组最后一个元素 array.slice(-1)
- 获取字符串最后一个元素 string.substr(string.length-1,1)
- 数组转为字符串 string.split('')
- 字符串转为数组 array.join('')

## leetcode20：有效的括号
```javascript
var isValid = function(s) {
  const sLen = s.length;
  const arr = [];
  if (sLen % 2 === 1) {
    return false
  }
  for (let i = 0; i < sLen; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      arr.push(s[i]);
    }
    if (s[i] === ')' && arr.pop() !== '(') {
      return false
    }
    if (s[i] === ']' && arr.pop() !== '[') {
      return false
    }
    if (s[i] === '}' && arr.pop() !== '{') {
      return false
    }
  }
  return arr.length === 0;
}
```

## leetcode1047：删除字符串中的所有相邻重复项
```javascript
var removeDuplicates = function(S) {
	const _sLen = S.length;
	const arr = [];
	if (_sLen === 0) {
	  return ''
	}
	for (let i = 0; i < _sLen; i++) {
	 if (arr[arr.length - 1] === S[i] && arr.length > 0) {
	   arr.pop()
	 } else {
	   arr.push(S[i])
	 }
	}
	return arr.join('');
};
```
