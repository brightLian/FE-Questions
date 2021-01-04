# 链表
## 链表的简介
- 多个元素组成的列表
- 元素储存不连续，用 next 指针连在一起
- 使用 object 可以模拟链表
```javascript
const a = { val: 1 };
const b = { val: 2 };
const c = { val: 3 };
const d = { val: 4 };
a.next = b;
b.next = c;
c.next = d;

// 遍历链表
let p = a;
while (p) {
  console.log(p.val);
  p = p.next;
}

// 插入
const e = { val: 5};
c.next = e; // 在 c 后面插入 e
e.next = d; // 在 e 后面插入 d

// 删除
c.next = d; // 删除链表中的 e
```

## 题中常用操作
- 遍历链表：使用 while 循环
- 删除链表中的某一项：将要被删除节点的前一个的 next 改为 next.next

## 数组和链表的区别
- 数组：增删非首尾元素时往往需要移动元素。
- 链表：增删首位元素，不需要移动元素，只需要更改 next 指针就可以。

## leetcode237：删除链表中的节点
链表无法直接获得被删除节点的上一个节点，将被删除节点移动到下一个节点。
```javascript
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
};
```

## leetcode：206反转链表
双指针遍历链表
```javascript
var reverseList = function(head) {
  let linkedList1 = head;
  let linkedList2 = null;
  while(linkedList1) {
    let current1 = linkedList1.next;
    linkedList1.next = linkedList2;
    linkedList2 = linkedList1;
    linkedList1 = current1;
  }
  return linkedList2
};
```

## leetcode2：两数相加
新建一个空链表，遍历两个链表，将个位、十位...追加到新链表上。
```javascript
var addTwoNumbers = function(l1, l2) {
  const l3 = new ListNode(0, null);
  let p1 = l1;
  let p2 = l2;
  let p3 = l3;
  let carry = 0;
  while(p1 || p2) {
    const v1 = p1 ? p1.val : 0;
    const v2 = p2 ? p2.val : 0;
    const val = v1 + v2 + carry;
    carry = Math.floor(val / 10);
    p3.next = new ListNode(val % 10);
    if (p1) {
      p1 = p1.next
    }
    if (p2) {
      p2 = p2.next
    }
    p3 = p3.next
  }
  if (carry) {
    p3.next = new ListNode(carry);
  }
  return l3.next
};
```

## leetcode83：删除链表中的重复元素
```javascript
var deleteDuplicates = function(head) {
  let p = head;
  while(p && p.next) {
    if (p.val === p.next.val) {
      p.next = p.next.next;
    } else {
      // 避免多个相同元素连续
      p = p.next
    }
  }
  return head
};
```

## leetcode141：环形链表
```javascript

```
