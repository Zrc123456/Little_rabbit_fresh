import XtxSkeleton from "@/components/library/XtxSkeleton.vue";
import XtxCarousel from "@/components/library/XtxCarousel.vue";
import XtxMore from "@/components/library/XtxMore.vue";
import lazy from "@/components/directive/lazy";
import XtxBread from "@/components/library/XtxBread.vue";
import XtxBreadItem from "@/components/library/XtxBreadItem.vue";
import Xtxcheckbox from "@/components/library/Xtxcheckbox";
import XtxInfiniteLoading from "@/components/library/XtxInfiniteLoading";
import XtxCity from "@/components/library/XtxCity";
export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.component(XtxBread.name, XtxBread);
    app.component(XtxBreadItem.name, XtxBreadItem);
    app.component(Xtxcheckbox.name, Xtxcheckbox);
    app.component(XtxInfiniteLoading.name, XtxInfiniteLoading);
    app.component(XtxCity.name, XtxCity);
    app.directive("lazy", lazy);
  },
};
