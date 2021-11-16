import XtxSkeleton from "@/components/library/XtxSkeleton.vue";
import XtxCarousel from "@/components/library/XtxCarousel.vue";
import XtxMore from "@/components/library/XtxMore.vue";
import lazy from "@/components/directive/lazy";
export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.directive("lazy", lazy);
  },
};
