<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filters">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="item in filters.brands"
          :key="item.id"
          :class="{ active: item.id === filters.selectedBrandId }"
          @click="
            filter.selectedBrandId = item.id;
            updateSelectedFilters();
          "
          >{{ item.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="item in filters.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          href="javascript:"
          :class="{ active: sub.name === item.selectedFilterName }"
          v-for="sub in item.properties"
          :key="sub.id"
          @click="
            item.selectedFilterName = sub.name;
            updateSelectedFilters();
          "
          >{{ sub.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { getSubCategoryFilterById } from "@/api/category";
import { ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
export default {
  name: "SubFilter",
  setup(props, { emit }) {
    const route = useRoute();
    const { filters, getData, updateSelectedFilters } = useSubfilter(emit);
    getData(route.params.id);
    return {
      filters,
      updateSelectedFilters,
    };
  },
};
// 封装筛选逻辑
function useSubfilter(emit) {
  const filters = ref();
  const getData = (id) => {
    getSubCategoryFilterById(id).then((res) => {
      /**
       * 数据处理
       * {brands} 品牌
       * saleProperties 其他条件
       */
      res.result.brands.unshift({ id: null, name: "全部" });
      //   res.result.properties.unshift();
      // 设置默认选中的品牌的ID
      res.result.selectedBrandId = null;
      res.result.saleProperties.forEach((item) => {
        item.properties.unshift({ id: null, name: "全部" });
        // 设置默认选中的筛选条件的名字
        item.selectedFilterName = "全部";
      });
      // console.log(res.result);
      filters.value = res.result;
    });
  };
  onBeforeRouteUpdate((e) => getData(e.params.id));
  // 用于存储汇总的用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };
  const updateSelectedFilters = () => {
    // 汇总用户选择的品牌id
    selectedFilters.brandId = filters.value.selectedBrandId;
    selectedFilters.attrs = [];
    filters.value.saleProperties.forEach((item) => {
      // 如果用户选择了筛选条件并且用户选择的筛选条件不是"全部"
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        // 将用户选择的筛选条件存储在 attrs 数组中
        selectedFilters.attrs.push({
          // 筛选类别的名字
          groupName: item.name,
          // 筛选条件的名字
          propertyName: item.selectedFilterName,
        });
      }
    });
    console.log(selectedFilters);
    emit("onFilterChanged", selectedFilters);
  };
  return {
    filters,
    getData,
    updateSelectedFilters,
  };
}
</script>
<style scoped lang="less">
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>