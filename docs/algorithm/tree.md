# 树

## 树的简介
- 一种分层数据的抽象模型。
- 前端中常见的树包括：DOM 树、多级联动、树型控件。
- JS 中没有树，但是可以用 Object 和 Array 构建树（类似 JS 模拟虚拟 DOM）。

## 树的常用操作
- 深度优先遍历(dfs)：尽可能深的搜索树的分支。
  - 访问根节点
  - 对根节点的 children 挨个进行深度优先遍历
- 广度优先遍历：先访问离根节点最近的节点。
  - 新建一个队列，把根节点入队
  - 把队头出队并访问
  - 把队头的 children 按个入队
  - 重复第二、三步，直到队列清空
- 二叉树的先中后序遍历
- 下图中左侧为深度优先遍历，右侧为广度优先遍历。
<img src="/image/tree.png" width = "400" height = "300" />
```javascript
// 深度优先遍历
function dfs (root) {
  console.log(root.value);
  root.children.forEach((child) => {
    dfs(child)
  })
}

// 广度优先遍历
function bfs (root) {
  const queue = [root];
  while (queue.length > 0) {
    const n = queue.shift();
    console.log(queue.value);
    n.children.forEach((child) => {
      queue.push(child);
    })
  }
}
```

## 二叉树
- 定义：树中每个节点最多只有两个子节点。
- 在 JS 中通常用 Object 来模拟二叉树。
- 先序遍历
  - 访问根节点
  - 对根节点的左子树进行先序遍历
  - 对根节点对右子树进行先序遍历
- 中序遍历
  - 对根节点的左子树进行中序遍历
  - 访问根节点
  - 对根节点的右子树进行中序遍历
- 后序遍历
  - 对根节点的左子树进行后序遍历
  - 对根节点的右子树进行后序遍历
  - 访问根节点

```javascript
// 先序遍历
function preorder (root) {
  if (root) {
    console.log(root);
    preorder(root.left);
    preorder(root.right);
  }
}
function preorder2 (root) {
  if (root) {
    const stack = [root];
    while (stack.length > 0) {
      const n = stack.pop();
      console.log(n.value);
      if (n.right) {
        stack.push(n.right);
      }
      if (n.left) {
        stack.push(n.left);
      }
    }
  }
}

// 中序遍历
function inorder (root) {
  if (root) {
    inorder(root.left);
    console.log(root.value);
    inorder(root.right);
  }
}
function inorder2 (root) {
  if (root) {
    const stack = [root];
    let p = root;
    while (stack.length > 0) {
      while (p) {
        stack.push(p);
        p = p.left;
      }
      const n = stack.pop();
      console.log(n.value);
      p = p.right;
    }
  }
}

// 后序遍历
function postorder (root) {
  if (root) {
    postorder(root.left);
    postorder(root.right);
    postorder(root.value);
  }
}
function postorder2 (root) {
  if (root) {
    const stack = [root];
    const outputStack = [];
    while (stack.length > 0) {
      const n = stack.pop();
      outputStack.push(n);
      if (n.left) {
        stack.push(n.left);
      }
      if (n.right) {
        stack.push(n.right);
      }
    }
    while (outputStack.length > 0) {
      outputStack.pop();
      console.log(outputStack.value);
    }
  }
}
```
<img src="/image/xianxu.png" width = "200" height = "200" />
<img src="/image/zhongxu.png" width = "200" height = "200" />
<img src="/image/houxu.png" width = "200" height = "200" />
