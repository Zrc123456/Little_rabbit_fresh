<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证" ref="target">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <template v-slot:default>
      <div class="box">
        <ul
          v-if="brands"
          class="list"
          :style="{ transform: `translateX(${-currentIndex * 1240}px)` }"
        >
          <li v-for="i in brands" :key="i.id">
            <RouterLink to="/">
              <img :src="i.logo" alt="" />
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />>
      </div>
    </template>
  </HomePanel>
</template>

<script>
import { ref } from "vue";
import HomePanel from "@/views/home/components/HomePanel";
import useLazyData from "@/hooks/useLazyData";
import { getHotBrands } from "@/api/home";
import HomeSkeleton from "./HomeSkeleton.vue";
export default {
  name: "HomeBrand",
  setup() {
    const { target, result: brands } = useLazyData(getHotBrands);
    const currentIndex = ref(0);
    const toggle = (step) => {
      //   console.log(step);
      // 计算目标索引
      const nextIndex = currentIndex.value + step;
      // 控制索引范围;
      if (nextIndex < 0 || nextIndex > 1) return;
      // 真正的更改索引
      currentIndex.value = nextIndex;
      //   console.log(currentIndex.value);
    };
    // console.log(currentIndex.value);
    return {
      toggle,
      currentIndex,
      target,
      brands,
    };
  },
  components: { HomePanel, HomeSkeleton },
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>