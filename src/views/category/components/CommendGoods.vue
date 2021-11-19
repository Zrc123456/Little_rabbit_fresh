<template>
  <div class="ref-goods" v-for="item in topCategory?.children" :key="item.id">
    <div class="head">
      <h3>- {{ item.name }} -</h3>
      <p class="tag">温暖柔软，品质之选</p>
      <XtxMore />
    </div>
    <div class="body">
      <GoodsItem v-for="sub in item.goods" :key="sub.id" :sub="sub" />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/views/category/components/GoodItem";
import { getTopCategoryById } from "@/api/category";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default {
  name: "CommendGoods",
  components: { GoodsItem },
  setup() {
    const { getData, topCategory } = useTopCategory();
    // 查询id
    const route = useRoute();
    const id = route.params.id;
    getData(id);
    return {
      topCategory,
    };
  },
};
function useTopCategory() {
  const topCategory = ref();
  const getData = (id) => {
    getTopCategoryById(id).then((res) => {
      topCategory.value = res.result;
    });
  };
  // 每当路由跳转的时候，通过onBeforeRouteUpdate重新获取数据
  onBeforeRouteUpdate((to) => getData(to.params.id));
  return {
    getData,
    topCategory,
  };
}
</script>
<style lang="less" scoped>
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>