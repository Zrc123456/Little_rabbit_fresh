<template>
  <AppLayout>
    <div>
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <transition name="fade-right">
          <XtxBreadItem :key="toCategory?.id">{{
            toCategory.name
          }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 调用轮播图组件 -->
      <XtxCarousel
        :carousels="banners"
        :style="{
          height: '500px',
        }"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue-demi";
import useBanner from "@/hooks/useBanner";

export default {
  setup() {
    const toCategory = useCategory();
    //获取轮播图数据
    const { banners, getData } = useBanner();
    // 参数 1为轮播图数据 2为列表数据
    getData(2);
    return {
      toCategory,
      banners,
    };
  },
  components: {
    AppLayout,
  },
};
function useCategory() {
  const store = useStore();
  const route = useRoute();
  return computed(() => {
    // 根据id查找一级分类数据
    // id 从路由参数中获取
    return store.state.category.list.find(
      (item) => item.id === route.params.id
    );
  });
}
</script>

<style>
</style>