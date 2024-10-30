import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
          {
            path: 'modal', // Nested route for the modal
            name: 'modal',
            component: () => import('@/views/ModalView.vue'),
            meta: { showModal: true }, // Use meta to identify this as a modal route
          },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
});

export default router;
