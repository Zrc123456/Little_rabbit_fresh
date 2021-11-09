// 导入axios
import store from "@/store";
import axios from "axios";
// 基准路径
export const baseURL = "http://pcapi-xiaotuxian-front-devtest.itheima.net";
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
instanceWithToken.interceptors.response.use(() => {
    
})
