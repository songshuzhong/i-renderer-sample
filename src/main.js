import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import IRenderer from 'i-renderer/dist/js/renderer';

import App from './App';
import HelloWorld from './components/HelloWorld';

import 'element-plus/dist/index.css';
import 'i-renderer/dist/css/index.css';

const app = createApp(App);

app
  .use(ElementPlus)
  .use(IRenderer, {renderers: [HelloWorld]})
  .mount('#app');
