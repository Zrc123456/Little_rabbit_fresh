import { createRouter, createWebHashHistory } from "vue-router";
import HomePage from "@/views/home/HomePage";
const TopCategoryPage = () => import("@/views/category/TopCategoryPage.vue");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage.vue");
const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
