// /src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import HabitsList from '../views/HabitsList.vue';
import HabitForm from '../views/HabitForm.vue';
import HabitProgress from '../views/HabitProgress.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: Login, meta: { public: true } },
  { path: '/register', component: Register, meta: { public: true } },
  { path: '/dashboard', component: Dashboard },
  { path: '/habits', component: HabitsList },
  { path: '/habit/:id', component: HabitForm, props: true },
  { path: '/progress', component: HabitProgress },
  { path: '/:catchAll(.*)', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const token = localStorage.getItem('token');

  // --- 1) Rutas públicas ---
  if (to.meta.public) {
    if (token && (to.path === '/login' || to.path === '/register')) {
      return next('/dashboard');
    }
    return next();
  }

  // --- 2) Rutas privadas ---
  if (!token) {
    return next('/login');
  }

  // --- 3) Actualizar estado global ---
  if (!auth.isAuthenticated) {
    auth.setAuthenticated(true);
  }

  next();
});

export default router;
