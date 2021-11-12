<template>
  <AppLayoutVue>
    <div class="container">
      <HomeCategory />
    </div>
  </AppLayoutVue>
</template>

<script>
import AppLayoutVue from "@/components/AppLayout.vue";
import HomeCategory from "@/views/home/HomeCategory.vue";
export default {
  components: {
    AppLayoutVue,
    HomeCategory,
  },
};
</script>

<style scoped>
p {
  height: 500px;
}
</style>
