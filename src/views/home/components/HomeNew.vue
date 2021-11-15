<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
    <template v-slot:right>
      <!-- 查看全部-->
      <Xtxmore />
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
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "./HomePanel.vue";
import Xtxmore from "@/components/library/Xtxmore.vue";
import { ref } from "vue";
import { getNewGoods } from "@/api/home";

export default {
  setup() {
    const homeNew = ref();
    const getData = () => {
      getNewGoods().then((res) => {
        homeNew.value = res.result;
      });
    };
    getData();
    return {
      homeNew,
      getData,
    };
  },
  components: {
    HomePanel,
    Xtxmore,
  },
};
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
