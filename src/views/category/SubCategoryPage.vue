<template>
  <AppLayout>
    <div class="container">
      <XtxBread>
        <XtxBreadItem path="/">首页</XtxBreadItem>
        <XtxBreadItem :path="`/category/${category.topCategory?.id}`">{{
          category.topCategory?.name
        }}</XtxBreadItem>
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="category.subCategory?.id">
            {{ category.subCategory?.name }}
          </XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 分类 -->
      <SubFilter @onFilterChanged="onFilterChange" />
      <!-- 复选框 -->
      <!-- <XtxCheckbox v-model="isCheckedData">仅显示有货商品</XtxCheckbox> -->
      <!-- 排序组件 -->
      <SubSort @onSortChange="onFilterChange" />
      <GoodsList v-if="goodsList" :goods="goodsList.items" />
      <!-- 无限加载 -->
    </div>
    <XtxInfiniteLoading
      @infinite="loadMore"
      :loading="loading"
      :finished="finished"
    />
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/AppLayout";
import { useStore } from "vuex";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { computed, watch } from "vue";
import SubFilter from "@/views/category/components/SubFilter.vue";
import { ref } from "vue";
// 排序组件
import SubSort from "./components/SubSort.vue";
import GoodsList from "@/views/category/components/GoodsList.vue";
import { getGoodsReq } from "@/api/category";

export default {
  name: "SubCategoryPage",
  components: { AppLayout, SubFilter, SubSort, GoodsList },
  setup() {
    // 获取面包屑导航需要的分类数据
    const category = useBread();
    const isCheckedData = ref(false);
    const { goodsList, onFilterChange, loadMore, loading, finished } =
      useGoodsList();
    return {
      category,
      onFilterChange,
      isCheckedData,
      goodsList,
      loadMore,
      loading,
      finished,
    };
  },
};

function useBread() {
  // 获取 store 对象
  const store = useStore();
  // 获取 route 对象
  const route = useRoute();
  // 根据二级分类 id 查找二级分类和一级分类
  return computed(() => {
    // 用于存储一级分类和二级分类的对象
    const result = {};
    // 遍历一级分类
    store.state.category.list.forEach((topCategory) => {
      // 遍历二级分类
      topCategory.children?.forEach((subCategory) => {
        // 查找当前二级分类
        if (subCategory.id === route.params.id) {
          // 存储一级分类
          result.topCategory = {
            name: topCategory.name,
            id: topCategory.id,
          };
          // 存储二级分类
          result.subCategory = {
            name: subCategory.name,
            id: subCategory.id,
          };
        }
      });
    });
    // 返回结果
    return result;
  });
}
// 封装条件渲染
function useGoodsList() {
  const route = useRoute();
  const goodsList = ref();
  // 渲染条件
  const reqParams = ref({ categoryId: route.params.id, page: 1, pageSize: 5 });
  // 控制加载状态
  const loading = ref(false);
  // 控制无更多数据可以加载的状态
  const finished = ref(false);
  // 当渲染条件发生变化时候
  const onFilterChange = (target) => {
    reqParams.value = {
      ...reqParams.value,
      ...target,
      page: 1,
    };
  };
  // 当路由发生变化时
  onBeforeRouteUpdate((to) => {
    reqParams.value = {
      categoryId: to.params.id,
      page: 1,
    };
  });
  // 获取数据方法
  const getData = () => {
    loading.value = true;
    console.log("goods");

    getGoodsReq(reqParams.value).then((res) => {
      loading.value = false;
      if (reqParams.value.page === 1) {
        goodsList.value = res.result;
        // 当页码重置为1时, 重置 finished
        finished.value = false;
      } else {
        goodsList.value = {
          ...res.result,
          items: [...goodsList.value.items, ...res.result.items],
        };
      }
      if (reqParams.value.page === res.result.pages) {
        finished.value = true;
      }
    });
  };
  //初始调用时获取方法
  watch(
    () => reqParams.value,
    () => getData(),
    {
      immediate: true,
    }
  );
  const loadMore = () => {
    console.log(123123123123123);
    reqParams.value = {
      ...reqParams.value,
      page: reqParams.value.page + 1,
    };
  };
  return {
    goodsList,
    onFilterChange,
    getData,
    loadMore,
    loading,
    finished,
  };
}
</script>

<style scoped></style>
