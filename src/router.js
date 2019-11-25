import Vue from "vue";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
Vue.use(Router);

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      redirect: "profile",
      component: DashboardLayout,
      children: [
        {
          path: "/profile",
          name: "perfil",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/UserProfile.vue")
        },

        {
          path: "/edit_profile",
          name: "editar perfil",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/EditUser.vue")
        },
        {
          path: "/produtos",
          name: "produtos",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Produtos.vue")
        },
        {
          path: "/usuarios",
          name: "usuarios",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Usuarios.vue")
        },
        {
          path: "/categorias",
          name: "categorias",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Categorias.vue")
        },
        {
          path: "/fornecedores",
          name: "fornecedores",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Fornecedores.vue")
        },
        {
          path: "/entradas",
          name: "entradas",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Entradas.vue")
        },
        {
          path: "/saidas",
          name: "saidas",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Saidas.vue")
        }
      ]
    },
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/login",
          name: "entrar",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Login.vue")
        },
        {
          path: "/register",
          name: "registrar",
          component: () =>
            import(/* webpackChunkName: "demo" */ "./views/Register.vue")
        }
      ]
    }
  ]
});
