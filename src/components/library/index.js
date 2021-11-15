import XtxSkeleton from "@/components/library/XtxSkeleton.vue";
import XtxCarousel from "@/components/library/XtxCarousel.vue";
import Xtxmore from "@/components/library/Xtxmore.vue";

export default {
  install(app) {
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(Xtxmore.name, Xtxmore);
  },
};
