import {createRouter, createWebHashHistory} from 'vue-router';
import {Schema} from '@i-renderer-sample/lib';
import {ElLoading} from 'element-plus';

const createRoutes = () => {
  let routerMask;
  const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/',
        name: 'IWebsite',
        title: '零代码-IRenderer',
        component: Schema,
        props: {
          initSchema: () => import('./data/test.js')
        },
        children: [
          {
            path: '/code',
            name: 'Code',
            title: 'Code',
            component: () => import('./components/Code.vue'),
          }
        ]
      },
    ]
  });
  router.beforeEach((to, from, next) => {
    if (to.path !== from.path) {
      routerMask = ElLoading.service({
        fullscreen: true,
        customClass: 'i-website__router__loader'
      });
    }
    next();
  });
  router.afterEach((route) => {
    const timer = setTimeout(() => {
      if (routerMask && typeof routerMask.close === 'function') {
        routerMask.close();
        clearTimeout(timer);
      }
    }, 1600);
  });
  return router;
}

export default createRoutes;
