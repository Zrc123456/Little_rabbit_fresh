import { requestWithoutToken } from "@/utils/request";
/**
 *
 * @获取分类
 * @return Promise
 */
export function getCategoryList() {
  return requestWithoutToken("/home/category/head", "get");
}
