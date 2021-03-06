<template>
  <div class="home-category" @mouseleave="current = null">
    <ul class="menu">
      <li
        :class="{ active: current && item.id === current.id }"
        v-for="item in list"
        :key="item.id"
        @mouseenter="current = item"
      >
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink to="/" v-for="child in item.children" :key="child.id">{{
            child.name
          }}</RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton
            animated="fade"
            width="60px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
            style="margin-right: 5px"
          ></XtxSkeleton>
          <XtxSkeleton
            animated="fade"
            width="100px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></XtxSkeleton>
        </template>
      </li>
    </ul>
    <!-- 分类商品推荐 -->
    <div class="layer" v-if="current">
      <h4>分类商品推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="current.goods">
        <li v-for="item in current.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.description }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="current.brands">
        <li class="brand" v-for="item in current.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.logo" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.nameEn }}</p>
              <p class="desc ellipsis-2">{{ item.name }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { getBrands } from "@/api/home";

export default {
  name: "HomeCategory",
  setup() {
    const store = useStore();
    const current = ref();
    const brand = ref({
      id: "brand",
      name: "品牌",
      children: [{ name: "推荐品牌", id: "child-brand" }],
      brands: [],
    });
    // 添加brands用于渲染数据
    getBrands().then((res) => {
      // console.log(res);
      brand.value.brands = res.result;
    });
    // 在vuex中获取数据,通过计算属性 截取字符串
    const list = computed(() => {
      const result = store.state.category.list.map((item) => ({
        ...item,
        children: item.children ? item.children.slice(0, 2) : null,
      }));
      result.push(brand.value);
      return result;
    });
    // console.log(list.value);
    return { list, current };
  },
};
</script>
<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background-color: @xtxColor;
      }
      &.active {
        background-color: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 分类商品推荐
  // 注意: 此弹层样式放置在 .home-category 内部
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
