<template>
  <div>
    <ul>
      <li v-for="item in goods" :key="item.id">
        <GoodsItem :sub="item" />
      </li>
    </ul>
  </div>
</template>
    <script>
import GoodsItem from "@/views/category/components/GoodItem";
export default {
  name: "GoodsList",
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
    },
    setup(props) {
      console.log(props.goods, "123123");
    },
  },
};
</script>

    <style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5px;
  li {
    margin-right: 20px;
    margin-bottom: 20px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>