// 导入axios
import router from "@/router";
import store from "@/store";
import axios from "axios";
// 基准路径
// 线上环境: https://apipc-xiaotuxian-front.itheima.net/
// 开发环境: http://pcapi-xiaotuxian-front-devtest.itheima.net/
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net/";
// 创建请求实例对象 (不包含token)
const instanceWithoutToken = axios.create({ baseURL });
// 创建请求实例对象 (包含token)
const instanceWithToken = axios.create({ baseURL });
// 用于捕获错误, 传递错误
const onRejected = (error) => Promise.reject(error);
// 创建请求拦截器
instanceWithToken.interceptors.request.use((config) => {
  const token = store.state.user.profile.token;
  if (token) {
    // 存入请求头中
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, onRejected);
// 创建响应拦截器
instanceWithToken.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 401无权限登陆
    if (error.response.status == 401) {
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
      // 清除本地信息
      store.commit("user/setUser", {});
    }
    return Promise.reject(error);
  }
);
function generateRequestConfig(url, methods, data) {
  return {
    url: url,
    method: methods,
    [methods == "get" ? "params" : "data"]: data,
  };
}
// 不含token的响应拦截器
instanceWithoutToken.interceptors.response.use((response) => response.data);
// 返回携带token的请求
export function requestWithToken(url, methods, data) {
  return instanceWithToken(generateRequestConfig(url, methods, data));
}
// 用于发送普通请求
export function requestWithoutToken(url, method, data) {
  return instanceWithoutToken(generateRequestConfig(url, method, data));
}
