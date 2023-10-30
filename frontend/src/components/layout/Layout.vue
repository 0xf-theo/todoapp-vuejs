
//le composant "Layout" agit comme un conteneur global pour l'application Vue. 
//Il inclut le panneau latéral de navigation ("Sidebar") et le conteneur principal du contenu ("MainContent"). 
//Les pages de l'application seront affichées dans la zone de "MainContent" à l'aide de Vue Router, 
//ce qui permet de naviguer entre les différentes pages tout en maintenant une structure de page cohérente.

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
