import {createRouter, createWebHashHistory} from 'vue-router';
import {Schema} from '@i-renderer-sample/lib';

export const routes = createRouter({
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
      component: () => import('./pages/home.vue')
    },
    {
      path: '/about',
      name: 'About',
      title: '零代码-About',
      component: Schema,
      props: {
        updatable: false,
        initSchema: () => import('./pages/about.js')
      },
    }
  ]
})