var sortArrayByParity = function(A) {
  let len = A.length;
  let left = [];
  let right = [];
  for (let i = 0; i < len; i++) {
    if (A[i] % 2) {
      right.push(A[i]);
    } else {
      left.push(A[i]);
    }
  }
  return left.concat(right);
};