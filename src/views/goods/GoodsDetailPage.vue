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
          <div class="spec">
            <GoodsInfo :goodsDetail="goodsDetail" />
            <!-- 规格组件 skuId="1369155865461919746" -->
            <GoodsSku :skus="goodsDetail.skus" :specs="goodsDetail.specs" />
          </div>
        </div>
        <!-- 商品推荐 -->
        <GoodsRelevant></GoodsRelevant>
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品+评价 -->
            <div class="goods-tabs"></div>
            <!-- 注意事项 -->
            <div class="goods-warn"></div>
          </div>
          <!-- 24热榜 -->
          <div class="goods-aside"></div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import AppLayout from "@/components/AppLayout";
import { ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";
import { useRoute } from "vue-router";
import GoodsImages from "./components/GoodsImages.vue";
import GoodsSales from "./components/GoodsSales.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsSku from "./components/GoodsSku.vue";
export default {
  name: "GoodsDetailPage",
  components: {
    GoodsSku,
    GoodsRelevant,
    AppLayout,
    GoodsImages,
    GoodsSales,
    GoodsInfo,
  },
  setup() {
    const router = useRoute();
    const { goodsDetail, getGoodsDetail } = useGoodsDetail();
    getGoodsDetail(router.params.id);
    return {
      goodsDetail,
    };
  },
};
// 用户获取数据的方法
function useGoodsDetail() {
  const goodsDetail = ref();
  const getGoodsDetail = (id) => {
    getGoodsDetailById(id).then((res) => {
      goodsDetail.value = res.result;
      console.log(goodsDetail.value);
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
