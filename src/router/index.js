import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import RegisterView from "../views/RegisterView.vue"
import CustomView from "../views/CustomView.vue"
import pattern from "../views/PatternTest.vue"
import info from "../components/3D.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/SignInView.vue"),
      props: { model: false, rerenderKey: false },
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pattern",
      name: "pattern",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: pattern,
    },

    {
      path: "/register",
      name: "register",

      component: RegisterView,
    },

    {
      path: "/custom",
      name: "custom",

      component: CustomView,
    },

    {
      path: "/info",
      name: "info",

      component: info,
    },
  ],
});


export default router
