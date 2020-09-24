import Vue from 'vue'
import { ApiService } from './api';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import VueClipboard from 'vue-clipboard2';

Vue.config.productionTip = false;

Vue.prototype.$api = new ApiService();

Vue.use(VueClipboard);

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
