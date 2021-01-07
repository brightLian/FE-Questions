# 字典
## 字典的简介
- 与集合类似，字典也是一种存储唯一值的数据结构，但是它是以键值对的形式存储。
- ES6中有字典，Map。

## 字典的常用操作
- 键值对的增删改查
	- 增：m.set('a', '1');
	- 删除某个元素：m.delete('a');
	- 删除全部元素：m.clear();
	- 改：再次进行 set 操作即可 m.set('a', 2);
	- 查：m.get('a');
	- 查是否有：m.has('a');

## leetcode3：无重复最长子串
```javascript
var lengthOfLongestSubstring = function(s) {
    let len = s.length
    let l = 0;
    let res = 0
    let map = new Map();
    for(let r = 0; r < len; r++) {
        if (map.has(s[r])&&map.get(s[r]) >= l) {
            l = map.get(s[r]) + 1;
        }
        res = Math.max(res, r - l + 1);
        map.set(s[r], r);
    }
    return res;
};
``` 

## leetcode76：最小覆盖子串
```javascript

```
