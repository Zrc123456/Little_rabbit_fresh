<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    //   获取插槽的数据
    const items = this.$slots.default();
    // 最终存储的结构
    const result = [];
    items.forEach((item, index) => {
      result.push(item);
      // 判断是否为最后一项
      if (index < items.length - 1) {
        //  如果不是最后一项，加>
        result.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    // console.log(result);
    // 创建最外层的元素 将布局作为子元素。
    return h("div", { class: "xtx-bread" }, result);
  },
};
</script>
<style lang="less" scoped>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>