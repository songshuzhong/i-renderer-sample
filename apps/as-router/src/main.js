import {createApp} from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';

import {IRenderer} from '@i-renderer-sample/lib';
import {routes} from './routes';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

const app = createApp(App);

app
  .use(ElementPlus)
  .use(IRenderer)
  .use(routes)
  .mount('#app');