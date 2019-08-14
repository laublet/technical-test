/* eslint-disable no-console */
/* eslint-disable no-new */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { ClientTable } from 'vue-tables-2';

import './assets/sass/main.scss';

import App from './App';
import router from './router';
import constants from './constants';

Vue.use(VueAxios, axios);
Vue.use(ClientTable);

Vue.config.productionTip = false;

axios.defaults.baseURL = constants.URL_BACK || 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common.Authorization = localStorage.getItem('Clef');

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
