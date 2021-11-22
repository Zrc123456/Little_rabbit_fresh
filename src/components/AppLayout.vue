<template>
  <AppTopNav />
  <AppHeader />
  <!-- 插槽 -->
  <AppHeaderSticky />
  <slot />
  <AppFooter />
</template>

<script>
import AppTopNav from "@/components/AppTopNav.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppHeaderSticky from "@/components/AppHeaderSticky";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // 调用方法获取list数据
    store.dispatch("category/getCategories");
    // console.log(store.state.category.list);
  },
  components: {
    AppTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky,
  },
};
</script>

<style></style>
