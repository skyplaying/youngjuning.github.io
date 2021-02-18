/*
 * @lc app=leetcode.cn id=1 lang=rust
 *
 * [1] 两数之和
 */

// @lc code=start
use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut index_hashmap = HashMap::with_capacity(nums.len());

        for (idx, &n) in nums.iter().enumerate() {
            let y = target - n;
            if let Some(&i) = index_hashmap.get(&y) {
                return vec![i as i32, idx as i32];
            } else {
                index_hashmap.insert(n, idx);
            }
        }

        vec![]
    }
}
// @lc code=end
