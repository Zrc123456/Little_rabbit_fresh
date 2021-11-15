<template>
  <div class="home-banner" @mouseenter="stop" @mouseleave="start">
    <!-- 轮播图组件 -->
    <XtxCarousel
      v-if="banner"
      :autoplay="true"
      :carousels="banner"
      :duration="3000"
    ></XtxCarousel>
  </div>
</template>

<script>
// 轮播图
import { ref } from "vue";
import { getBanners } from "@/api/home";

export default {
  name: "HomeBanner",
  setup() {
    const { banner, getData } = useBanners();
    // 获取轮播图数据
    getData();
    return {
      banner,
    };
  },
};
function useBanners() {
  const banner = ref();
  const getData = () => {
    getBanners().then((res) => {
      banner.value = res.result;
    });
  };
  return {
    banner,
    getData,
  };
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    :deep(.carousel-btn.prev) {
      left: 270px;
    }
    :deep(.carousel-indicator) {
      padding-left: 250px;
    }
  }
}
</style>