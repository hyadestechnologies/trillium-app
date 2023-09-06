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
      path: '/profile',
      name: 'ProfilePage',
      component: () => import('../components/ProfilePageComponent/ProfilePageComponent.vue'),
      children: [
        {
          path: 'visualizeprofile',
          name: 'VisualizeProfilePage',
          component: () =>
            import(
              '../components/ProfilePageComponent/ProfileMenuComponent/ProfileVisualizationComponent/ProfileVisualizationComponent.vue'
            ),
        },
        {
          path: 'updateprofile',
          name: 'UpdateProfilePage',
          component: () =>
            import(
              '../components/ProfilePageComponent/ProfileMenuComponent/ProfileUpdateComponent/ProfileUpdateComponent.vue'
            ),
        },
        {
          path: 'posts',
          name: 'ProfilePostPage',
          component: () =>
            import(
              '../components/ProfilePageComponent/ProfileMenuComponent/ProfilePostPageComponent/ProfilePostPageComponent.vue'
            ),
        },
        {
          path: 'friends',
          name: 'ProfileFriendPage',
          component: () =>
            import(
              '../components/ProfilePageComponent/ProfileMenuComponent/ProfileFriendPageComponent/ProfileFriendPageComponent.vue'
            ),
        },
        {
          path: 'followed',
          name: 'ProfileFollowPage',
          component: () =>
            import(
              '../components/ProfilePageComponent/ProfileMenuComponent/ProfileFollowPageComponent/ProfileFollowPageComponent.vue'
            ),
        },
        {
          path: 'settings',
          name: 'UserSettings',
          component: () => import('../components/SettingsPageComponent/SettingsPageComponent.vue'),
        },
      ],
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
