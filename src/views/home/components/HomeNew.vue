<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱" ref="target">
    <template v-slot:right>
      <!-- 查看全部-->
      <XtxMore />
    </template>
    <template v-slot:default>
      <ul class="goods-list" v-if="homeNew">
        <li v-for="item in homeNew" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "./HomePanel.vue";
import XtxMore from "@/components/library/XtxMore.vue";
import { getNewGoods } from "@/api/home";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/home/components/HomeSkeleton.vue";
export default {
  setup() {
    /**
     * @target 需要监听的对象
     * @result 返回值
     */
    const { target, result: homeNew } = useLazyData(getNewGoods);
    return {
      homeNew,
      target,
    };
  },
  components: {
    HomePanel,
    XtxMore,
    HomeSkeleton,
  },
};
// 新鲜好物
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
