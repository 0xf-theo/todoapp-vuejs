import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/auth/Login.vue";
import AddEditTask from "./pages/task/AddEditTask.vue";
import TaskListing from "./pages/task/Listing.vue";
import Layout from "./components/layout/Layout.vue";

const routes = [
  { path: "/login", component: Login },
  {
    path: "/",
    component: Layout,
    children: [
      { path: "task", component: TaskListing },
      { path: "task/add", component: AddEditTask },
      { path: "task/edit/:id", component: AddEditTask },
      // { path: "task/history", component: TaskHistory },
    ],
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
