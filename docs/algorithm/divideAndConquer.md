# 分治算法
## 分治算法的简介
- 分治是算法设计中的一种思想。
- 他将一个问题分成多个和原问题相似的小问题，递归解决小问题，再将结果合并以解决原来的问题。

## 分治算法的使用场景
- 归并排序
  - 分：把数组从中间一分为二。
  - 解：递归地对两个子数组进行归并排序。
  - 合：合并有序子数组。
- 快速排序
  - 分：选基准，按基准把数组分成两个子数组。
  - 解：递归地对两个子数组进行快速排序。
  - 合：对两个子数组进行合并。
