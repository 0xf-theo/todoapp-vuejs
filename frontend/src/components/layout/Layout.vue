<template>
  <div class="content">
    <Sidebar />
    <MainContent>
      <div class="main-content">
        <router-view></router-view>
      </div>
    </MainContent>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import MainContent from "./MainContent.vue";

export default {
  name: "Layout",

  components: {
    Sidebar,
    MainContent,
  },
};
</script>

<style scoped>
.content {
  display: flex;
}
</style>
