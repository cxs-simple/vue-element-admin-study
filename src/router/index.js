import Vue from "vue";
import Router from "vue-router";
import { Layout } from "@/layout"

Vue.use(Router);

export const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
  {
    path: "/",
    component: Layout
    // redirect: '/dashboard'
  }
];

const createRouter = () =>
  new Router({
    routes,
  });

const router = createRouter();

export default router;
