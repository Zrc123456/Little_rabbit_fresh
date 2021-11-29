<template>
  <div class="goods-image">
    <div
      class="large"
      v-show="isShow"
      :style="{
        backgroundImage: `url(${mainPictures[currentIndex]})`,
        backgroundPositionX: bgPosition.x + 'px',
        backgroundPositionY: bgPosition.y + 'px',
      }"
    ></div>
    <div class="middle" ref="target">
      <img :src="mainPictures[currentIndex]" alt="" />
      <div
        class="layer"
        v-show="isShow"
        :style="{
          left: layerPosition.left + 'px',
          top: layerPosition.top + 'px',
        }"
      ></div>
    </div>
    <ul class="small">
      <li
        @mouseenter="showItems(index)"
        v-for="(item, index) in mainPictures"
        :key="item"
        :class="{ active: currentIndex === index }"
      >
        <img :src="item" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
  props: {
    mainPictures: {
      type: Array,
    },
  },
  setup() {
    const currentIndex = ref(0);
    // 鼠标移动展示图片
    const showItems = (step) => {
      currentIndex.value = step;
    };
    const target = ref();
    let isShow = ref(false);
    // 监测鼠标移动
    const { elementX, elementY, isOutside } = useMouseInElement(target);
    // 用于控制镜片的位置
    const layerPosition = ref({ left: 0, top: 0 });
    // 用于控制大图位置
    const bgPosition = ref({ x: 0, y: 0 });
    // 监听鼠标移动
    watch(
      [elementX, elementY, isOutside],
      ([elementX, elementY, isOutside]) => {
        if (isOutside) {
          isShow.value = false;
        } else {
          isShow.value = true;
          layerPosition.value = {
            left: elementX - 100,
            top: elementY - 100,
          };
          bgPosition.value = {
            x: -layerPosition.value.left * 2,
            y: -layerPosition.value.top * 2,
          };
          //   console.log(bgPosition.value, "12323213");
          // 控制镜片水平方向溢出
          if (layerPosition.value.left < 0) {
            layerPosition.value.left = 0;
          } else if (layerPosition.value.left > 200) {
            layerPosition.value.left = 200;
          }
          // 控制镜片垂直方向溢出
          if (layerPosition.value.top < 0) {
            layerPosition.value.top = 0;
          } else if (layerPosition.value.top > 200) {
            layerPosition.value.top = 200;
          }
        }
      }
    );
    return {
      currentIndex,
      target,
      showItems,
      isShow,
      layerPosition,
      bgPosition,
    };
  },
};
</script>

<style lang="less" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
