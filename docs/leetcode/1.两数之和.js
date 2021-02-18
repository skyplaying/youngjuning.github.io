/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const k = nums.findIndex(j => target - x === j);
    if (k != -1 && k != i) {
      return [i, k];
    }
  }
};
// @lc code=end
