<template>
  <div>
    <HomePanel title="人气推荐" subTitle="人气爆款 不容错过">
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
      </template>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from "./HomePanel.vue";
import { getSentment } from "@/api/home/";
import { ref } from "vue";
export default {
  setup() {
    const sentiment = ref();
    const getSentmentList = () => {
      getSentment().then((res) => {
        console.log(res);
        sentiment.value = res.result;
      });
    };
    getSentmentList();
    return {
      sentiment,
    };
  },
  components: {
    HomePanel,
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
