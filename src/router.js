import {createRouter, createWebHashHistory} from 'vue-router';
import {Schema} from 'i-renderer/dist/js/renderer';
import FrameSchema from './data/frame';
import Index from './pages/index';
import Home from './pages/home';
import About from './pages/about';

const createRoutes = () => createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'IWebsite',
      title: '零代码-IRender',
      component: Schema,
      props: {
        initSchema: FrameSchema,
        classname: 'i-renderer-sample__container',
        canSchemaUpdate: false
      },
      children: [
        {
          path: '/',
          name: '',
          title: 'Default',
          component: Schema,
          props: {
            initSchema: Home,
            canSchemaUpdate: true
          }
        },
        {
          path: '/index',
          name: 'index',
          title: 'Index',
          component: Schema,
          props: {
            initSchema: Index,
            canSchemaUpdate: true
          }
        },
        {
          path: '/about',
          name: 'about',
          title: 'About',
          component: Schema,
          props: {
            initSchema: About,
            canSchemaUpdate: true
          }
        }
      ]
    }
  ]
});

export default createRoutes;
