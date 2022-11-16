import { createRouter, createWebHistory } from 'vue-router';
import TestComponent from '@/components/TestComponent.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TestComponent,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../components/TestComponent.vue'),
    },
    {
      path: '/Auth',
      name: 'AuthPage',
      component: () => import('../components/AuthPageComponent/AuthPageComponent.vue'), 
    }
  ],
});

export default router;
