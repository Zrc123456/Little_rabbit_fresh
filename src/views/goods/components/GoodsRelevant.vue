<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon"></i>
      <span class="title">同类商品推荐</span>
    </div>
    <!-- 此处使用改造后的xtx-carousel.vue -->
    <XtxCarousel :carousels="carousels" />
  </div>
</template>

<script>
import { ref } from "vue";
import { getRelevantGoods } from "@/api/goods";
import { useRoute } from "vue-router";
export default {
  name: "GoodsRelevant",
  setup() {
    const router = useRoute();
    const { relevantGoods, carousels, getData } = useRelevantGoods();
    getData(router.params.id);
    return {
      relevantGoods,
      carousels,
    };
  },
};
function useRelevantGoods() {
  // 用于存储同类商品
  const relevantGoods = ref();
  // 用于存储轮播图数据
  const carousels = ref([]);
  const getData = (id, limit) => {
    getRelevantGoods(id, limit).then((res) => {
      // 每页显示的条数
      const size = 4;
      const total = Math.ceil(res.result.length / size);
      // console.log(total);
      for (let i = 0; i < total; i++) {
        carousels.value.push(res.result.slice(i * size, i * size + size));
      }
      // console.log(carousels.value);
    });
  };
  return {
    relevantGoods,
    carousels,
    getData,
  };
}
</script>

<style scoped lang="less">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@xtxColor, 40%);
      }
    }
  }
  :deep(.xtx-carousel) {
    height: 380px;
    .carousel {
      &-indicator {
        bottom: 30px;
        span {
          &.active {
            background: @xtxColor;
          }
        }
      }
      &-btn {
        top: 110px;
        opacity: 1;
        background: rgba(0, 0, 0, 0);
        color: #ddd;
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
