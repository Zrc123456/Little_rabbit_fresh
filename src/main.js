import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/common.less";
import "normalize.css";
// 骨架效果
import UI from "@/components/library";

createApp(App).use(store).use(router).use(UI).mount("#app");
