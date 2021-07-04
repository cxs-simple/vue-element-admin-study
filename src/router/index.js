import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
  },
];

const createRouter = () =>
  new Router({
    routes,
  });

const router = createRouter();

export default router;
