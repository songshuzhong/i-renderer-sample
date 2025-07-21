import {createRouter, createWebHashHistory} from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      title: '零代码-Home',
      component: () => import('./Test.vue'),
      props: {
        to: '/about'
      }
    },
    {
      path: '/about',
      name: 'About',
      title: '零代码-About',
      component: () => import('./Test.vue'),
      props: {
        to: '/home'
      },
    }
  ]
})

export default router;