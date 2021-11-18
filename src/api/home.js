import { requestWithoutToken } from "@/utils/request";
/**
 *
 * @获取分类
 * @return Promise
 */
export function getCategoryList() {
  return requestWithoutToken("/home/category/head", "get");
}
/**
 * @获取品牌列表推荐
 */
export function getBrands(limit = 6) {
  return requestWithoutToken("/home/brand", "get", { limit });
}
/**
 *
 * @param  distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns {Promise}
 */
export function getBanners(distributionSite = 1) {
  return requestWithoutToken("/home/banner", "get", { distributionSite });
}

/**
 * 获取新鲜好物
 * @param limit 限制请求数据的数量
 * @return {Promise}
 */
export function getNewGoods(limit = 4) {
  return requestWithoutToken("/home/new", "get", { limit });
}
/**
 *热门品牌
 * @param {*} limit
 * @returns
 */
export function getSentment(limit = 4) {
  return requestWithoutToken("/home/hot", "get", { limit });
}
/**
 *
 * @param {*} limit 热门推荐
 * @returns
 */
//
export function getHotBrands() {
  return requestWithoutToken("/home/brand", "get");
}
/**
 * 获取产品区块数据
 * @return {Promise}
 */
export function getProducts() {
  return requestWithoutToken("/home/goods", "get");
}
/**
 *
 * @param {*} limit
 * @returns
 */
export function getSpecial(limit = 3) {
  return requestWithoutToken("/home/special", "get", { limit });
}
