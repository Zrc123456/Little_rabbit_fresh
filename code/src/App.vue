<template>
  <div>{{ user }}</div>
  <button @click="onClickHandler">button</button>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    let user = store.state.user;
    function onClickHandler() {
      // 测试
      store.commit("user/setUser", { token: "text" });
    }
    return {
      user,
      onClickHandler,
    };
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
