<template>
  <div class="xtx-pagination">
    <a v-if="currentPage > 1" href="javascript:" @click="updateCurrentPage(-1)"
      >上一页</a
    >
    <span v-if="pageInfo.start > 1">...</span>
    <a
      :class="{ active: item === currentPage }"
      :key="item"
      @click="updateCurrentPage({ type: 'jump', item: item })"
      v-for="item in pageInfo.pageNumage"
      href="javascript:"
      >{{ item }}</a
    >
    <span v-if="pageInfo.end < pageInfo.totalPage">...</span>
    <a
      v-if="currentPage < pageInfo.totalPage"
      href="javascript:"
      @click="updateCurrentPage(1)"
      >下一页</a
    >
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  props: {
    page: {
      type: Number,
      default: 1,
    },
    counts: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  name: "XtxPagination",
  setup(props, { emit }) {
    // 当前页
    const currentPage = useVModel(props, "page", emit);
    // 总数据条数
    const total = computed(() => props.counts);
    // 每页显示的数据条树
    const pageSize = computed(() => props.pageSize);
    // 显示的页码数量
    const pageButtonMaxNumber = ref(5);
    watch(currentPage, () => {
      console.log(currentPage.value);
    });
    // 页码偏移量
    const pageOffect = Math.floor(pageButtonMaxNumber.value / 2);

    const pageInfo = computed(() => {
      const totalPage = Math.ceil(total.value / pageSize.value);
      // 定义开始值
      let start = currentPage.value - pageOffect;
      // 定义结束值
      let end = start + pageButtonMaxNumber.value - 1;
      if (start < 1) {
        start = 1;
        let temp = start + pageButtonMaxNumber.value - 1;
        end = temp > totalPage ? totalPage : temp;
      }
      if (end > totalPage) {
        end = totalPage;
        let temp = end - pageButtonMaxNumber.value + 1;
        start = temp < 1 ? 1 : temp;
      }
      let pageNumage = [];
      for (let i = start; i <= end; i++) {
        pageNumage.push(i);
      }
      return {
        pageNumage,
        currentPage,
        totalPage,
      };
    });
    function updateCurrentPage(item) {
      if (item.type) {
        emit("update:page", item.item);
      } else {
        emit("update:page", currentPage.value + item);
      }
    }
    return {
      pageInfo,
      currentPage,
      updateCurrentPage,
    };
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
