import {createApp} from 'vue';
import ElementPlus from 'element-plus';
import {IRenderer, Editor} from 'i-renderer';

import createRoutes from './router';
import App from './App';
import HelloWorld from './components/HelloWorld';

import 'element-plus/dist/index.css';
import 'i-renderer/dist/css/index.css';

const app = createApp(App);
const routers = createRoutes();

app.component(Editor.name, Editor);
app
  .use(ElementPlus)
  .use(IRenderer, {renderers: [HelloWorld]})
  .use(routers)
  .mount('#app');
