import { topCategories } from "@/api/category";
import { getCategoryList } from "@/api/home";
export default {
  // 使用具有命名空间的 vuex 模块
  namespaced: true,
  state() {
    return {
      // 存储分类列表
      list: topCategories.map((name) => {
        return { name: name };
      }),
    };
  },
  mutations: {
    setCategories(state, payload) {
      // console.log(state.list);
      state.list = payload;
    },
    open(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = true;
    },
    close(state, id) {
      const target = state.list.find((item) => item.id === id);
      target.open = false;
    },
  },
  actions: {
    getCategories({ commit }) {
      getCategoryList().then((response) => {
        response.result.forEach((e) => {
          e.open = false;
        });
        commit(`setCategories`, response.result);
      });
    },
  },
};
