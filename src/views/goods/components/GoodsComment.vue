<template>
  <div class="goods-comment">
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span
          ><span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span
          ><span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            href="javascript:"
            :key="item.title"
            @click="
              activeTagName = item.title;
              updateReqParams({ tag: item.title });
            "
            :class="{ active: item.title === activeTagName }"
            v-for="item in commentInfo.tags"
            >{{ item.title }}（{{ item.tagCount }}）</a
          >
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        @click="updateReqParams({ sortField: '' })"
        href="javascript:"
        class="active"
        >默认</a
      >
      <a
        @click="updateReqParams({ sortField: 'createTime' })"
        href="javascript:"
        >最新</a
      >
      <a
        @click="updateReqParams({ sortField: 'praiseCount' })"
        href="javascript:"
        >最热</a
      >
    </div>
    <div class="list" v-if="commentList">
      <div class="item" v-for="item in commentList.items" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="" />
          <span>{{ formatNickname(item.member.nickname) }}</span>
        </div>
        <div class="body">
          <div class="score">
            <i
              v-for="score in item.score"
              :key="'s' + score"
              class="iconfont icon-wjx01"
            ></i>
            <i
              class="iconfont icon-wjx02"
              v-for="score in 5 - item.score"
              :key="'k' + score"
            ></i>
            <span class="attr">{{ formatAttrs(item.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ item.content }}
          </div>

          <div class="time">
            <span>{{ item.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i>{{ item.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <XtxPagination
      :pageSize="reqParams.pageSize"
      v-model:page="reqParams.page"
      :counts="counts"
    />
  </div>
</template>
<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
// import GoodsImages from "./GoodsImages.vue";
import { getCommentInfo, getCommentList } from "@/api/goods";
export default {
  name: "GoodsComment",
  components: {
    // GoodsImages,
  },
  setup() {
    const { commentInfo, activeTagName } = useGoodsCommentInfo();
    const {
      updateReqParams,
      commentList,
      formatAttrs,
      formatNickname,
      reqParams,
      counts,
    } = useGoodsCommentList();
    return {
      commentInfo,
      activeTagName,
      updateReqParams,
      commentList,
      formatAttrs,
      formatNickname,
      reqParams,
      counts,
    };
  },
};
function useGoodsCommentInfo() {
  // 存储数据
  const commentInfo = ref();
  const route = useRoute();
  const id = route.params.id;
  //默认选择
  const activeTagName = ref("全部评价");
  //   获取数据
  const getData = (id) => {
    getCommentInfo(id).then((res) => {
      res.result.tags.unshift({
        title: "有图",
        tagCount: res.result.hasPictureCount,
      });
      res.result.tags.unshift({
        title: "全部评价",
        tagCount: res.result.evaluateCount,
      });
      console.log(res.result);
      commentInfo.value = res.result;
    });
  };

  //   获取数据
  getData(id);
  return {
    commentInfo,
    activeTagName,
  };
}
function useGoodsCommentList() {
  // 用于存储评价列表数据
  const commentList = ref();
  // 获取路由信息对象
  const route = useRoute();
  // 参数对象
  const reqParams = ref({
    // 商品id
    id: route.params.id,
    // 当前页
    page: 1,
    // 每页显示的数据条数
    pageSize: 5,
    // 是否有图
    hasPicture: false,
    // 评价标记
    tag: "",
    // 排序字段
    sortField: "",
  });
  // 点击筛选
  const updateReqParams = (target) => {
    // 如果用户点击的是标签 要针对tag进行单独处理
    if (target.tag) {
      reqParams.value = {
        ...reqParams.value,
        hasPicture: target.tag === "有图",
        tag:
          target.tag === "全部评价" || target.tag === "有图" ? "" : target.tag,
      };
    } else {
      reqParams.value = {
        ...reqParams.value,
        ...target,
      };
    }
  };
  // 总数据条数
  const counts = ref(0);

  //获取数据
  const getData = () => {
    getCommentList(reqParams.value).then((res) => {
      commentList.value = res.result;
      counts.value = res.result.counts;
    });
  };
  watch(
    () => reqParams.value,
    () => {
      getData();
      console.log(reqParams.value);
    },
    {
      immediate: true,
      deep: true,
    }
  );
  // 格式化昵称
  const formatNickname = (nickname) => {
    return nickname.substr(0, 1) + "****" + nickname.substr(-1);
  };
  const formatAttrs = (attrs) => {
    return attrs.map((attr) => `${attr.name}: ${attr.nameValue}`).join(" ");
  };
  return {
    commentList,
    updateReqParams,
    formatNickname,
    formatAttrs,
    reqParams,
    counts,
  };
}
</script>

<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor, 50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: @xtxColor;
      }
    }
  }
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
