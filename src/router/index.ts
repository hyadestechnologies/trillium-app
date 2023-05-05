import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth',
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: () => import('../components/AuthPageComponent/AuthPageComponent.vue'),
    },
    {
      path: '/dashboard',
      name: 'DashboardComponent',
      component: () => import('../components/Dashboard/DashboardComponent.vue'),
      children: [
        {
          path: 'createpost',
          name: 'CreatePostpage',
          component: () => import('../components/Dashboard/Post/PostCreationComponent/PostCreationComponent.vue'),
        },
        {
          path: 'visualizepost',
          name: 'VisualizePostpage',
          component: () =>
            import('../components/Dashboard/Post/PostVisualizationComponent/PostVisualizationComponent.vue'),
        },
        {
          path: 'visualizepostsearch/:keyword',
          name: 'VisualizaPostSearchPage',
          component: () =>
            import('../components/Dashboard/Post/PostVisualizationComponent/PostSearchVisualizationComponent.vue'),
          props: true,
        },
      ],
    },
  ],
});

export default router;
