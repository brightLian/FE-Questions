# 队列
## 队列的简介
- 一种先进先出的数据结构
- 使用数组的 push()、shift() 可以模拟队列

## 队列的应用场景
- 需要先进先出的场景（比如：食堂排队打饭、JS 异步中的任务队列、计算最近的请求次数）

## leetcode933：最近的请求次数
```javascript
var RecentCounter = function() {
    this.queue = [];
};

RecentCounter.prototype.ping = function(t) {
    this.queue.push(t);
    while(this.queue[0] < t - 3000) {
        this.queue.shift();
    }
    return this.queue.length;
};
```

## leetcode239：滑动窗口最大值
```javascript
var maxSlidingWindow = function(nums, k) {
    let result = [];
    if (nums.length <= 1) {
        return nums;
    }
    while(nums.length >= k) {
        result.push(Math.max(...nums.slice(0, k)));
        nums.shift();
    }
    return result;
};
```
