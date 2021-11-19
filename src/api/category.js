import { requestWithoutToken } from "@/utils/request";

// 一级分类
export const topCategories = [
  "居家",
  "美食",
  "服饰",
  "母婴",
  "个护",
  "严选",
  "数码",
  "运动",
  "杂货",
];
/**
 *
 * @param {*} id 参数id required
 * @returns {Promise}
 */
export const getTopCategoryById = (id) => {
  return requestWithoutToken("/category", "get", { id });
};
/**
 *
 * @param {*} id
 * @returns
 */
export function getSubCategoryFilterById(id) {
  return requestWithoutToken("/category/sub/filter", "get", { id });
}
