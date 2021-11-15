<template>
  <AppLayoutVue>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
      <HomeNew />
      <HomeSentiment />
    </div>
  </AppLayoutVue>
</template>

<script>
import AppLayoutVue from "@/components/AppLayout.vue";
// 分类
import HomeCategory from "@/views/home/components/HomeCategory.vue";
// 轮播图
import HomeBanner from "@/views/home/components/HomeBanner.vue";
// 面板
import HomeNew from "@/views/home/components/HomeNew.vue";
// 人气推荐
import HomeSentiment from "./components/HomeSentiment.vue";
export default {
  components: {
    AppLayoutVue,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeSentiment,
  },
};
</script>

<style scoped>
</style>
