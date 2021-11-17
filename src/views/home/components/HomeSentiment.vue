<template>
  <HomePanel title="人气推荐" subTitle="人气爆款 不容错过" ref="target">
    <template v-slot:default>
      <ul class="sentiment-list" v-if="sentiment">
        <li v-for="item in sentiment" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" /> 
            <p class="name ellipsis">{{ item.title }}</p>
            <p class="title">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </template>
  </HomePanel>
</template>

<script>
import HomePanel from "./HomePanel.vue";
import { getSentment } from "@/api/home/";
import useLazyData from "@/hooks/useLazyData";
import HomeSkeleton from "@/views/home/components/HomeSkeleton.vue";

export default {
  setup() {
    const { target, result: sentiment } = useLazyData(getSentment);
    return {
      target,
      sentiment,
    };
  },
  components: {
    HomePanel,
    HomeSkeleton,
  },
};
</script>

<style scoped lang="less">
.sentiment-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #ffffff;
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
    .title {
      color: #ccc;
      font-size: 16px;
    }
  }
}
</style>
