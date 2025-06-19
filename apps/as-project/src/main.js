import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import {IRenderer, api} from '@i-renderer-sample/lib';

import createRoutes from './router';
import App from './App.vue';
import HelloWorld from './components/HelloWorld.vue';
import Weather from './components/weather.vue';
import View1 from './components/View.vue';
import Particle from './components/Particle.vue';
import {WcInput} from './components/WcInput';
import {WcCard, WcFooter} from './components/WcCard';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
import './assets/style.css';
import './assets/loading.less';
import './assets/home.scss';

const app = createApp(App);

customElements.define('wc-input', WcInput);
customElements.define('wc-card', WcCard);
customElements.define('wc-footer', WcFooter);

api()
  .useApi()
  .get('/antd-user.json')
  .then(res => {
    const routers = createRoutes();
    app
      .use(ElementPlus)
      .use(IRenderer, {
        permissions: res.data.permissions,
        roles: res.data.roles,
        actions: {
          login: function (proxy, config, context, onActionFeedback, options = {}) {
            config.actionType = 'extends';
            config.triggered = 'valid';
            this.extends(proxy, config, context, onActionFeedback, options).then(r => {
              if (r) {
                const data = this.extends(proxy, {actionType: 'extend', triggered: 'getData'}, context, onActionFeedback, options);
                onActionFeedback && onActionFeedback(data);
              } else {
                onActionFeedback && onActionFeedback('CANCEL_LOADING');
              }
            }).catch((e) => {
              console.error(e);
              onActionFeedback && onActionFeedback('CANCEL_LOADING');
            });
          }
        },
        renderers: [HelloWorld, Weather, View1, Particle]
      })
      .use(routers)
      .mount('#app');
  })
  .catch((e) => {
    console.error(e);
  });