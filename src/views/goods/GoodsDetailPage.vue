<template>
  <AppLayout>
    <div class="xtx-goods-page">
      <div class="container">
        <!-- 面包屑 -->
        <XtxBread v-if="goodsDetail">
          <XtxBreadItem path="/">{{
            goodsDetail.categories[0].name
          }}</XtxBreadItem>
          <XtxBreadItem path="/">{{
            goodsDetail.categories[1].name
          }}</XtxBreadItem>
          <XtxBreadItem path="/">{{ goodsDetail.name }}</XtxBreadItem>
        </XtxBread>
        <!-- 商品信息 -->
        <div class="goods-info">
          <!-- 左侧 -->
          <div class="media" v-if="goodsDetail">
            <GoodsImages :mainPictures="goodsDetail.mainPictures" />
            <GoodsSales />
          </div>
          <!-- 右侧 -->
          <div class="spec" v-if="goodsDetail">
            <GoodsInfo :goodsDetail="goodsDetail" />
            <!-- 规格组件 skuId="1369155865461919746" -->
            <GoodsSku
              @onSpecChanged="onSpecChanged"
              :skus="goodsDetail.skus"
              :specs="goodsDetail.specs"
            />
            <!-- 商品数量选择组件 -->
            <XtxNumberBox
              label="数量"
              v-model="goodsCount"
              :max="goodsDetail.inventory"
            />
            <!-- 加入购物车 -->
            <XtxButton type="primary" style="margin-top: 15px"
              >加入购物车</XtxButton
            >
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer" v-if="goodsDetail">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs">
              <GoodsTab />
            </div>
            <!-- 注意事项 -->
            <div class="goods-warn">
              <GoodsWarn />
            </div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1"></GoodsHot>
            <GoodsHot :type="2"></GoodsHot>
            <GoodsHot :type="3"></GoodsHot>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { provide, ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";
import { useRoute } from "vue-router";
import GoodsImages from "./components/GoodsImages.vue";
import GoodsSales from "./components/GoodsSales.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsSku from "./components/GoodsSku.vue";
import GoodsTab from "./components/GoodsTab.vue";
import GoodsHot from "./components/GoodsHot.vue";
import GoodsWarn from "@/views/goods/components/GoodsWarn";

export default {
  name: "GoodsDetailPage",
  components: {
    GoodsSku,
    GoodsRelevant,
    AppLayout,
    GoodsImages,
    GoodsSales,
    GoodsInfo,
    GoodsTab,
    GoodsHot,
    GoodsWarn,
  },
  setup() {
    const router = useRoute();
    const { goodsDetail, getGoodsDetail } = useGoodsDetail();
    // 用于存储用户选择的商品数量
    const goodsCount = ref(1);
    getGoodsDetail(router.params.id);
    // 当用户选择完整的规格以后 更新视图
    const onSpecChanged = (data) => {
      goodsDetail.value.price = data.price;
      goodsDetail.value.oldPrice = data.oldPrice;
      goodsDetail.value.inventory = data.inventory;
    };
    // 将数据开放到子组件
    provide("goodsDetail", goodsDetail);
    return {
      goodsDetail,
      onSpecChanged,
      goodsCount,
    };
  },
};
// 用户获取数据的方法
function useGoodsDetail() {
  const goodsDetail = ref();
  const getGoodsDetail = (id) => {
    getGoodsDetailById(id).then((res) => {
      goodsDetail.value = res.result;
      // console.log(goodsDetail.value);
    });
  };
  return {
    goodsDetail,
    getGoodsDetail,
  };
}
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
