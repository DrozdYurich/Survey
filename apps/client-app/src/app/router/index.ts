import { TheAuth } from '@/pages/Auth';
import { TheLogin } from '@/pages/Auth/Login';
import { TheRegistr } from '@/pages/Auth/Registr';
import { HomeView } from '@pages/HomePage/index';
import { SurveyPage } from '@pages/SurveyPage/index';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/survey',
      name: 'survey',
      component: SurveyPage,
    },
    {
      path: '/auth',
      name: 'auth',
      component: TheAuth,
      children: [
        {
          path: 'login',
          name: 'login',
          component: TheLogin,
        },
        {
          path: 'registr',
          name: 'registr',
          component: TheRegistr,
        },
      ],
    },
  ],
});

export default router;
