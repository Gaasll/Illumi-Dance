import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TryitView from "../views/TryitView.vue"
import RegisterView from "../views/RegisterView.vue"


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
      path: "/try",
      name: "try",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TryitView,
    },

    {
      path: "/register",
      name: "register",

      component: RegisterView,
    },


  ],
});


export default router
