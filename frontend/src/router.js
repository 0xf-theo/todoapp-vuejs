
//gérer la navigation entre les différentes pages. Lorsque l'URL de la page change, 
//le routeur associé à ce fichier redirige vers une route spécifique, 
//ce qui détermine le composant qui sera affiché à l'utilisateur. 
//Par exemple, lorsque je vais sur l'URL "/task", le composant "TaskListing" est automatiquement rendu dans la partie 
//de la page réservée au contenu de mon application, qui est définie dans le composant "Layout".

import { createRouter, createWebHistory } from "vue-router";

import Login from "./pages/auth/Login.vue";
import AddEditTask from "./pages/task/AddEditTask.vue";
import TaskListing from "./pages/task/Listing.vue";
import TaskHistory from "./pages/task/TaskHistory.vue";
import Layout from "./components/layout/Layout.vue";
import Register from "./pages/auth/Register.vue";

function requireLoggedIn(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("user")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/login"); // go to '/login';
  }
}

const routes = [
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/",
    component: Layout,
    beforeEnter: requireLoggedIn,
    children: [
      { path: "", component: TaskListing },
      { path: "task", component: TaskListing },
      { path: "task/add", component: AddEditTask },
      { path: "task/edit/:id", component: AddEditTask },
      { path: "history", component: TaskHistory },
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
