# 排序和搜索
## 排序的简介
- 排序：把某个乱序的数组变成升序或降序的数组
- 搜索：找出数组中某个元素的下标
- JS 中的排序：数组的 sort 方法
- JS 中的搜索：数组的 indexOf 方法

## 排序
- 冒泡排序：
  - 比较所有的相邻元素，如果第一个比第二个大，则交换他们。
  - 一轮下来，可以保证最后一个数是最大的。
  - 执行 n-1 轮即可完成。
- 选择排序：
  - 找到数组中的最小值，选中它放在第一位。
  - 找到数组中的第二小，选中它放在第二位。
  - 以此类推，执行 n - 1 轮。
- 插入排序：
  - 从第二个数往前比。
  - 比他大就往后排。
  - 以此类推进行到最后一个数。
- 归并排序：
  - 分：把数组分成两半，再递归把子数组进行分的操作，直到分成单独的数。
  - 合：把两个数合并为有序数组，再对有序数组进行合并，直到合并称一个数组。
- 快速排序：
  - 分区：从数组中任意选择一个基准，比基准小的元素放在基准前面，比基准大的放在基准后面。
  - 递归：递归地对子数组前后的子数组进行分区。
```javascript
// 冒泡排序
Array.prototype.bubbleSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    for (let j = 0; j < this.length - i - 1; j++) {
      if (this[j] > this[j + 1]) {
        const temp = this[j];
        this[j] = this[j + 1];
        this[j + 1] = temp;
      }
    }
  }
}

// 选择排序
Array.prototype.selectionSort = function () {
  for (let i = 0; i < this.length - 1; i++) {
    let currentMin = i;
    for (let j = i + 1; j < this.length; j++) {
      if (this[currentMin] > this[j]) {
        currentMin = j
      }
    }
    if (currentMin !== i) {
      const temp = this[i];
      this[i] = this[currentMin];
      this[currentMin] = temp;
    }
  }
}

// 插入排序
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    const temp = this[i];
    let j = i;
    while (j > 0) {
      if (this[j - 1] > temp) {
        this[j] = this[j - 1];
      } else {
        break
      }
      j--
    }
    this[j] = temp
  }
}

// 归并排序
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

// 快速排序
Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) {
      return  arr
    }
    const left = [];
    const right = [];
    const mid = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...rec(left), mid, ...rec(right)]
  }
  const res = rec(this);
  res.forEach((n, i) => {
    this[i] = n
  })
}
```

## 搜索：
- 顺序搜索：
  - 遍历数组。
  - 找到和目标值相等的元素，返回它的下标。
  - 没有找到则返回 -1。
- 二分搜索（折半搜索）：在某个有序数组里面搜索
  - 从数组中间元素开始，如果中间元素是目标值，则搜索结束。
  - 如果目标值大于或小于中间元素，则在大于或小于中间元素的那一半中进行搜索。
```javascript
// 顺序搜索
Array.prototype.sequntialSearch = function (item) {
  for (let i = 0; i < length; i++) {
    if (this[i] === item) {
      return i
    }
  }
  return -1
}

// 二分搜索
Array.prototype.bindarySearch = function (item) {
  let low = 0;
  let high = this.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const temp = this[mid];
    if (temp < item) {
      low = mid + 1;
    } else if (temp > item) {
      high = mid - 1
    } else {
      return mid
    }
  }
  return -1
}
```