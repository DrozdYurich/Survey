import { createRouter, createWebHistory } from 'vue-router';
import { HomeView } from '@pages/HomePage/index';
import { SurveyPage } from '@pages/SurveyPage/index';

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
  ],
});

export default router;
