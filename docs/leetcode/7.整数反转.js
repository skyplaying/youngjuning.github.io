/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let reverseNum = 0;
  if (x < 0) {
    reverseNum =
      -x
        .toString()
        .replace('-', '')
        .split('')
        .reverse()
        .join('') * 1;
  } else {
    reverseNum =
      x
        .toString()
        .split('')
        .reverse()
        .join('') * 1;
  }
  if (reverseNum < -Math.pow(2, 31) - 1 || reverseNum > Math.pow(2, 31) - 1) {
    return 0;
  }
  return reverseNum;
};
// @lc code=end
