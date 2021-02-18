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
  for (let index = 0; index < nums.length; index++) {
    const element = nums[index];
    const fIndex = nums.findIndex(i => target - element === i);
    if (fIndex != -1 && fIndex != index) {
      return [index, fIndex];
    }
  }
};
// @lc code=end
