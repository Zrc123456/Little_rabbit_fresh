import { createStore } from "vuex";
// 引入模块化组件

import user from "@/store/user";
import cart from "@/store/cart";
import category from "./category";
// 引入配置persistedstate 插件(持久化)
import createPersistedState from "vuex-persistedstate";
export default createStore({
  // 自动存入
  plugins: [
    createPersistedState({
      key: "rabbit-client-pc",
      path: ["user", "cart"],
    }),
  ],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    category,
    cart,
  },
});
