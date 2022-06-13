import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as VueScrollTo from 'vue-scrollto';
import './../node_modules/bulma/css/bulma.css';
import '../src/styles/main.less';
import './../node_modules/notie/dist/notie.min.css';
import i18n from './i18n';
import VueCookies from 'vue-cookies-ts';

library.add(faPencilAlt);
library.add(faEye);
library.add(faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

// @ts-ignore
Vue.use(VueScrollTo);

Vue.use(VueCookies);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
