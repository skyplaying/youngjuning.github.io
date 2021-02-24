/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
  let result = false;
  if (x >= 0) {
    const reverseX =
      x
        .toString()
        .split('')
        .reverse()
        .join('') * 1;
    if (reverseX === x) {
      result = true;
    }
  }
  return result;
};
// @lc code=end
