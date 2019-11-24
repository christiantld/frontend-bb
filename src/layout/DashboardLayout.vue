<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Argon" title="Argon">
      <template slot="links">
        <sidebar-item :link="{name: 'Produtos', icon: 'ni ni-planet text-red', path: '/produtos'}" />
        <sidebar-item
          :link="{name: 'Categorias', icon: 'ni ni-planet text-purple', path: '/categorias'}"
        />

        <sidebar-item
          :link="{name: 'Perfil do Usuário', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"
        />
        <sidebar-item
          :link="{name: 'Listar Usuários', icon: 'ni ni-single-02 text-success', path: '/usuarios'}"
        />
        <hr />
        <sidebar-item :link="{name: 'Entrar', icon: 'ni ni-key-25 text-info', path: '/login'}" />
        <sidebar-item
          :link="{name: 'Cadastrar', icon: 'ni ni-circle-08 text-warning', path: '/register'}"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition
  },
  data() {
    return {
      sidebarBackground: "vue" //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
<style lang="scss">
</style>
